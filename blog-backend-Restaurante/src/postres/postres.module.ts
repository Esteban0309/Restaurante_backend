// postres.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postre } from './postres.entity';
import { PostresService } from './postres.service';
import { PostresController } from './postres.controller'; // si lo tienes

@Module({
  imports: [TypeOrmModule.forFeature([Postre])],
  providers: [PostresService],
  controllers: [PostresController], // si tienes uno
  exports: [PostresService], // opcional, si otros módulos lo usan
})
export class PostresModule {}
