import { Controller, Post, Body, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { VinosService } from './vino.service';
import { CreateVinoDto } from './dto/create-vino.dto';
import { UpdateVinoDto } from './dto/update-vino.dto'; // Asumo que tienes o crearás este DTO
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('vinos')
export class VinosController {
  constructor(private readonly vinosService: VinosService) {}

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
  async update(@Param('id') id: string, @Body() body: UpdateVinoDto) {
    return this.vinosService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.vinosService.remove(id);
  }
}
