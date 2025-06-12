import {
  Controller, Get, Post, Put, Delete, Body, Param,
  Query, BadRequestException, NotFoundException,
  UseInterceptors, UploadedFile,
  InternalServerErrorException
} from '@nestjs/common';
import { PostresService } from './postres.service';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Postre } from './postres.entity';
import { CreatepostreDto } from './dto/create_postres';
import { UpdatepostreDto } from './dto/update_postres';

@Controller('Postres')
export class PostresController {
  constructor(private readonly PostresService: PostresService) { }

  @Post()
  async create(@Body() dto: CreatepostreDto) {
    const Postre = await this.PostresService.create(dto);
    return new SuccessResponseDto('Postre created successfully', Postre);
  }

  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('isActive') isActive?: string,
  ): Promise<SuccessResponseDto<Pagination<Postre>>> {
    if (isActive !== undefined && isActive !== 'true' && isActive !== 'false') {
      throw new BadRequestException('Invalid value for "isActive". Use "true" or "false".');
    }
    const result = await this.PostresService.findAll({ page, limit }, isActive === 'true');
    if (!result) throw new InternalServerErrorException('Could not retrieve Postres');

    return new SuccessResponseDto('Postres retrieved successfully', result);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const Postre = await this.PostresService.findOne(id);
    if (!Postre) throw new NotFoundException('Postre not found');
    return new SuccessResponseDto('Postre retrieved successfully', Postre);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdatepostreDto) {
    const Postre = await this.PostresService.update(id, dto);
    if (!Postre) throw new NotFoundException('Postre not found');
    return new SuccessResponseDto('Postre updated successfully', Postre);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const Postre = await this.PostresService.remove(id);
    if (!Postre) throw new NotFoundException('Postre not found');
    return new SuccessResponseDto('Postre deleted successfully', Postre);
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
    const Postre = await this.PostresService.updateProfile(id, file.filename);
    if (!Postre) throw new NotFoundException('Postre not found');
    return new SuccessResponseDto('Profile image updated', Postre);
  }
}