// postres.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postre } from './postres.entity';
import { postresService } from './postres.service';
import { postresController } from './postres.controller'; // si lo tienes

@Module({
  imports: [TypeOrmModule.forFeature([Postre])],
  providers: [postresService],
  controllers: [postresController], // si tienes uno
  exports: [postresService], // opcional, si otros módulos lo usan
})
export class PostresModule {}
