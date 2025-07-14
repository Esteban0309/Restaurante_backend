import { Controller, Post, Body, Get } from '@nestjs/common';
import { VinosService } from './vino.service';
import { CreateVinoDto } from './dto/create-vino.dto';

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
