import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { CreateentradaDto } from './dto/create_entradas';
import { UpdateentradaDto } from './dto/update_entradas';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Entradas } from './entradas.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('entradas')
export class EntradasController {
  constructor(private readonly entradasService: EntradasService) {}

  @Post()
  async create(@Body() dto: CreateentradaDto) {
    const entrada = await this.entradasService.create(dto);
    return new SuccessResponseDto('Entrada creada exitosamente', entrada);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('isActive') isActive?: string,
  ): Promise<SuccessResponseDto<Pagination<Entradas>>> {
    if (
      isActive !== undefined &&
      isActive !== 'true' &&
      isActive !== 'false'
    ) {
      throw new BadRequestException(
        'Valor inválido para "isActive". Usa "true" o "false".',
      );
    }

    const result = await this.entradasService.findAll(
      { page, limit },
      isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    );

    if (!result)
      throw new InternalServerErrorException('No se pudieron obtener las entradas');

    return new SuccessResponseDto('Entradas obtenidas exitosamente', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const entrada = await this.entradasService.findOne(id);
    if (!entrada) throw new NotFoundException('Entrada no encontrada');
    return new SuccessResponseDto('Entrada obtenida exitosamente', entrada);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateentradaDto) {
    const entrada = await this.entradasService.update(id, dto);
    if (!entrada) throw new NotFoundException('Entrada no encontrada');
    return new SuccessResponseDto('Entrada actualizada exitosamente', entrada);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const entrada = await this.entradasService.remove(id);
    if (!entrada) throw new NotFoundException('Entrada no encontrada');
    return new SuccessResponseDto('Entrada eliminada exitosamente', entrada);
  }

  @Put(':id/profile')
  @UseInterceptors(
    FileInterceptor('profile', {
      storage: diskStorage({
        destination: './public/profile',
        filename: (req, file, cb) =>
          cb(null, `${Date.now()}-${file.originalname}`),
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException('Solo se permiten archivos JPG o PNG'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadProfile(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file)
      throw new BadRequestException('Se requiere una imagen de perfil');
    const entrada = await this.entradasService.updateProfile(id, file.filename);
    if (!entrada) throw new NotFoundException('Entrada no encontrada');
    return new SuccessResponseDto('Imagen de perfil actualizada', entrada);
  }
}
