import {
Controller, Get, Post, Put, Delete, Body, Param,
Query, BadRequestException, NotFoundException,
UseInterceptors, UploadedFile,
InternalServerErrorException
} from '@nestjs/common';
import { EntradasService } from './entradas.service';
import { CreateentradaDto } from './dto/create_entradas';
import { UpdateentradaDto } from './dto/update_entradas';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { entrada } from './entradas.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('entradas')
export class entradasController {
constructor(private readonly entradasService: EntradasService) { }

@Post()
async create(@Body() dto: CreateentradaDto) {
  const entrada = await this.entradasService.create(dto);
  return new SuccessResponseDto('entrada created successfully', entrada);
}

@Get()
async findAll(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Query('isActive') isActive?: string,
): Promise<SuccessResponseDto<Pagination<entrada>>> {
  if (isActive !== undefined && isActive !== 'true' && isActive !== 'false') {
    throw new BadRequestException('Invalid value for "isActive". Use "true" or "false".');
  }
  const result = await this.entradasService.findAll({ page, limit }, isActive === 'true');
  if (!result) throw new InternalServerErrorException('Could not retrieve entradas');

  return new SuccessResponseDto('entradas retrieved successfully', result);
}

@Get(':id')
async findOne(@Param('id') id: string) {
  const entrada = await this.entradasService.findOne(id);
  if (!entrada) throw new NotFoundException('entrada not found');
  return new SuccessResponseDto('entrada retrieved successfully', entrada);
}

@Put(':id')
async update(@Param('id') id: string, @Body() dto: UpdateentradaDto) {
  const entrada = await this.entradasService.update(id, dto);
  if (!entrada) throw new NotFoundException('entrada not found');
  return new SuccessResponseDto('entrada updated successfully', entrada);
}

@Delete(':id')
async remove(@Param('id') id: string) {
  const entrada = await this.entradasService.remove(id);
  if (!entrada) throw new NotFoundException('entrada not found');
  return new SuccessResponseDto('entrada deleted successfully', entrada);
}

@Put(':id/profile')
@UseInterceptors(FileInterceptor('profile', {
  storage: diskStorage({
    destination: './public/profile',
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
  }),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      return cb(new BadRequestException('Only JPG or PNG files are allowed'), false);
    }
    cb(null, true);
  }
}))
async uploadProfile(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
  if (!file) throw new BadRequestException('Profile image is required');
  const entrada = await this.entradasService.updateProfile(id, file.filename);
  if (!entrada) throw new NotFoundException('entrada not found');
  return new SuccessResponseDto('Profile image updated', entrada);
}
}
