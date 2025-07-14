import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { VinosService } from './vino.service';
import { CreateVinoDto } from './dto/create-vino.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('vinos')
export class VinosController {
  constructor(private readonly vinosService: VinosService) { }

  @Post()
  async create(@Body() body: CreateVinoDto) {
    return this.vinosService.create(body);
  }


  @Get()
  findAll() {
    return this.vinosService.findAll();
  }
}
