import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Pagination } from 'nestjs-typeorm-paginate';

import { PlatoFuerteService } from './platosfuertes.service';
import { CreatePlatoFuerteDto } from './dto/create_platosfuertes';
import { UpdatePlatoFuerteDto } from './dto/update_platosfuertes';
import { PlatoFuerte } from './platosfuertes.entity';
import { SuccessResponseDto } from 'src/common/dto/response.dto';

@Controller('platos-fuertes')
export class PlatoFuerteController {
  constructor(private readonly platoFuerteService: PlatoFuerteService) {}

  @Post()
  async create(@Body() dto: CreatePlatoFuerteDto) {
    const created = await this.platoFuerteService.create(dto);
    return new SuccessResponseDto('PlatoFuerte created successfully', created);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('isActive') isActive?: string,
  ): Promise<SuccessResponseDto<Pagination<PlatoFuerte>>> {
    if (isActive !== undefined && !['true', 'false'].includes(isActive)) {
      throw new BadRequestException('Invalid value for "isActive". Use "true" or "false".');
    }
    const result = await this.platoFuerteService.findAll({ page, limit }, isActive === 'true');
    if (!result) throw new InternalServerErrorException('Could not retrieve PlatoFuerte records');
    return new SuccessResponseDto('PlatoFuerte records retrieved', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const record = await this.platoFuerteService.findOne(id);
    if (!record) throw new NotFoundException('PlatoFuerte not found');
    return new SuccessResponseDto('PlatoFuerte retrieved', record);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdatePlatoFuerteDto) {
    const updated = await this.platoFuerteService.update(id, dto);
    if (!updated) throw new NotFoundException('PlatoFuerte not found');
    return new SuccessResponseDto('PlatoFuerte updated', updated);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const deleted = await this.platoFuerteService.remove(id);
    if (!deleted) throw new NotFoundException('PlatoFuerte not found');
    return new SuccessResponseDto('PlatoFuerte deleted', deleted);
  }

  @Put(':id/profile')
  @UseInterceptors(FileInterceptor('profile', {
    storage: diskStorage({
      destination: './public/profile',
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
    }),
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
        return cb(new BadRequestException('Only JPG or PNG files are allowed'), false);
      }
      cb(null, true);
    }
  }))
  async uploadProfile(@Param('id') id: number, @UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Profile image is required');
    const updated = await this.platoFuerteService.updateProfile(id, file.filename);
    if (!updated) throw new NotFoundException('PlatoFuerte not found');
    return new SuccessResponseDto('Profile image updated', updated);
  }
}
