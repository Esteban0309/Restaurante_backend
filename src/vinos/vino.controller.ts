import { Controller, Post, Body, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { VinosService } from './vino.service';
import { CreateVinoDto } from './dto/create-vino.dto';
import { UpdateVinoDto } from './dto/update-vino.dto'; // Asumo que tienes o crearás este DTO
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('vinos')
export class VinosController {
  constructor(private readonly vinosService: VinosService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateVinoDto) {
    return this.vinosService.create(body);
  }

  @Get()
  findAll() {
    return this.vinosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateVinoDto: UpdateVinoDto) {
    try {
      return await this.vinosService.update(id, updateVinoDto);
    } catch (error) {
      // Aquí puedes manejar errores o lanzarlos para que NestJS los capture
      throw error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.vinosService.remove(id);
  }

}
