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
import { postresService } from './postres.service';
import { CreatePostreDto } from './dto/create_postres';
import { UpdatePostreDto } from './dto/update_postres';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Postre } from './postres.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('postres')
export class postresController {
  constructor(private readonly postresService: postresService) {}

  @Post()
  async create(@Body() dto: CreatePostreDto) {
    const postre = await this.postresService.create(dto);
    return new SuccessResponseDto('postre creada exitosamente', postre);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('isActive') isActive?: string,
  ): Promise<SuccessResponseDto<Pagination<Postre>>> {
    if (
      isActive !== undefined &&
      isActive !== 'true' &&
      isActive !== 'false'
    ) {
      throw new BadRequestException(
        'Valor inválido para "isActive". Usa "true" o "false".',
      );
    }

    const result = await this.postresService.findAll(
      { page, limit },
      isActive === 'true' ? true : isActive === 'false' ? false : undefined,
    );

    if (!result)
      throw new InternalServerErrorException('No se pudieron obtener las postres');

    return new SuccessResponseDto('postres obtenidas exitosamente', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const postre = await this.postresService.findOne(id);
    if (!postre) throw new NotFoundException('postre no encontrada');
    return new SuccessResponseDto('postre obtenida exitosamente', postre);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatePostreDto) {
    const postre = await this.postresService.update(id, dto);
    if (!postre) throw new NotFoundException('postre no encontrada');
    return new SuccessResponseDto('postre actualizada exitosamente', postre);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const postre = await this.postresService.remove(id);
    if (!postre) throw new NotFoundException('postre no encontrada');
    return new SuccessResponseDto('postre eliminada exitosamente', postre);
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
    const postre = await this.postresService.updateProfile(id, file.filename);
    if (!postre) throw new NotFoundException('postre no encontrada');
    return new SuccessResponseDto('Imagen de perfil actualizada', postre);
  }
}
