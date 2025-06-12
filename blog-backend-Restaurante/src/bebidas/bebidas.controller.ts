import {
Controller, Get, Post, Put, Delete, Body, Param,
Query, BadRequestException, NotFoundException,
UseInterceptors, UploadedFile,
InternalServerErrorException
} from '@nestjs/common';
import { bebidasService } from './bebidas.service';
import { CreatebebidaDto } from './dto/create_bebidas';
import { UpdatebebidaDto } from './dto/update_bebidas';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { bebida } from './bebidas.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller('bebidas')
export class bebidasController {
constructor(private readonly bebidasService: bebidasService) { }

@Post()
async create(@Body() dto: CreatebebidaDto) {
  const bebida = await this.bebidasService.create(dto);
  return new SuccessResponseDto('bebida created successfully', bebida);
}

@Get()
async findAll(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
  @Query('isActive') isActive?: string,
): Promise<SuccessResponseDto<Pagination<bebida>>> {
  if (isActive !== undefined && isActive !== 'true' && isActive !== 'false') {
    throw new BadRequestException('Invalid value for "isActive". Use "true" or "false".');
  }
  const result = await this.bebidasService.findAll({ page, limit }, isActive === 'true');
  if (!result) throw new InternalServerErrorException('Could not retrieve bebidas');

  return new SuccessResponseDto('bebidas retrieved successfully', result);
}

@Get(':id')
async findOne(@Param('id') id: string) {
  const bebida = await this.bebidasService.findOne(id);
  if (!bebida) throw new NotFoundException('bebida not found');
  return new SuccessResponseDto('bebida retrieved successfully', bebida);
}

@Put(':id')
async update(@Param('id') id: string, @Body() dto: UpdatebebidaDto) {
  const bebida = await this.bebidasService.update(id, dto);
  if (!bebida) throw new NotFoundException('bebida not found');
  return new SuccessResponseDto('bebida updated successfully', bebida);
}

@Delete(':id')
async remove(@Param('id') id: string) {
  const bebida = await this.bebidasService.remove(id);
  if (!bebida) throw new NotFoundException('bebida not found');
  return new SuccessResponseDto('bebida deleted successfully', bebida);
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
  const bebida = await this.bebidasService.updateProfile(id, file.filename);
  if (!bebida) throw new NotFoundException('bebida not found');
  return new SuccessResponseDto('Profile image updated', bebida);
}
}
