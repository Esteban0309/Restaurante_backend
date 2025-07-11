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
import { platosfuertesService } from './platosfuertes.service';
import { CreatePlatoFuerteDto } from './dto/create_platosfuertes';
import { UpdatePlatoFuerteDto } from './dto/update_platosfuertes';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PlatoFuerte } from './platosfuertes.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('platosfuertes')
export class platosfuertesController {
  constructor(private readonly platosfuertesService: platosfuertesService) {}

  @Post()
  async create(@Body() dto: CreatePlatoFuerteDto) {
    const platofuerte = await this.platosfuertesService.create(dto);
    return new SuccessResponseDto('platofuerte creada exitosamente', platofuerte);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('isActive') isActive?: string,
  ): Promise<SuccessResponseDto<Pagination<PlatoFuerte>>> {
    if (
      isActive !== undefined &&
      isActive !== 'true' &&
      isActive !== 'false'
    ) {
      throw new BadRequestException(
        'Valor inválido para "isActive". Usa "true" o "false".',
      );
    }

    const result = await this.platosfuertesService.findAll(
      { page, limit },
      isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    );

    if (!result)
      throw new InternalServerErrorException('No se pudieron obtener las platosfuertes');

    return new SuccessResponseDto('platosfuertes obtenidas exitosamente', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const platofuerte = await this.platosfuertesService.findOne(id);
    if (!platofuerte) throw new NotFoundException('platofuerte no encontrada');
    return new SuccessResponseDto('platofuerte obtenida exitosamente', platofuerte);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePlatoFuerteDto) {
    const platofuerte = await this.platosfuertesService.update(id, dto);
    if (!platofuerte) throw new NotFoundException('platofuerte no encontrada');
    return new SuccessResponseDto('platofuerte actualizada exitosamente', platofuerte);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const platofuerte = await this.platosfuertesService.remove(id);
    if (!platofuerte) throw new NotFoundException('platofuerte no encontrada');
    return new SuccessResponseDto('platofuerte eliminada exitosamente', platofuerte);
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
    const platofuerte = await this.platosfuertesService.updateProfile(id, file.filename);
    if (!platofuerte) throw new NotFoundException('platofuerte no encontrada');
    return new SuccessResponseDto('Imagen de perfil actualizada', platofuerte);
  }
}
