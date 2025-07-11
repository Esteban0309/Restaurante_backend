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
import { BebidasService } from './bebidas.service';
import { CreatebebidaDto } from './dto/create_bebidas';
import { UpdatebebidaDto } from './dto/update_bebidas';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Bebidas } from './bebidas.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('bebidas')
export class BebidasController {
  constructor(private readonly bebidasService: BebidasService) {}

  @Post()
  async create(@Body() dto: CreatebebidaDto) {
    const bebida = await this.bebidasService.create(dto);
    return new SuccessResponseDto('Bebida creada exitosamente', bebida);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('isActive') isActive?: string,
  ): Promise<SuccessResponseDto<Pagination<Bebidas>>> {
    if (
      isActive !== undefined &&
      isActive !== 'true' &&
      isActive !== 'false'
    ) {
      throw new BadRequestException(
        'Valor inválido para "isActive". Usa "true" o "false".',
      );
    }

    const result = await this.bebidasService.findAll(
      { page, limit },
      isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    );

    if (!result)
      throw new InternalServerErrorException('No se pudieron obtener las bebidas');

    return new SuccessResponseDto('Bebidas obtenidas exitosamente', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const bebida = await this.bebidasService.findOne(id);
    if (!bebida) throw new NotFoundException('Bebida no encontrada');
    return new SuccessResponseDto('Bebida obtenida exitosamente', bebida);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatebebidaDto) {
    const bebida = await this.bebidasService.update(id, dto);
    if (!bebida) throw new NotFoundException('Bebida no encontrada');
    return new SuccessResponseDto('Bebida actualizada exitosamente', bebida);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const bebida = await this.bebidasService.remove(id);
    if (!bebida) throw new NotFoundException('Bebida no encontrada');
    return new SuccessResponseDto('Bebida eliminada exitosamente', bebida);
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
            new BadRequestException('Solo archivos JPG o PNG están permitidos'),
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
    if (!file) throw new BadRequestException('Se requiere imagen de perfil');
    const bebida = await this.bebidasService.updateProfile(id, file.filename);
    if (!bebida) throw new NotFoundException('Bebida no encontrada');
    return new SuccessResponseDto('Imagen de perfil actualizada', bebida);
  }
}
