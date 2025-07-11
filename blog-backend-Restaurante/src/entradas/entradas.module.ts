// Entradas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entradas } from './entradas.entity';
import { EntradasService } from './entradas.service';
import { EntradasController } from './entradas.controller'; // si lo tienes

@Module({
  imports: [TypeOrmModule.forFeature([Entradas])],
  providers: [EntradasService],
  controllers: [EntradasController], // si tienes uno
  exports: [EntradasService], // opcional, si otros módulos lo usan
})
export class EntradasModule {}
