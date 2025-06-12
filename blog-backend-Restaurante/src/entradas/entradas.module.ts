// Entradas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entrada } from './entradas.entity';
import { EntradasService } from './entradas.service';
import { entradasController } from './entradas.controller'; // si lo tienes

@Module({
  imports: [TypeOrmModule.forFeature([entrada])],
  providers: [EntradasService],
  controllers: [entradasController], // si tienes uno
  exports: [EntradasService], // opcional, si otros módulos lo usan
})
export class EntradasModule {}
