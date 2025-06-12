import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatoFuerte } from './platosfuertes.entity';
import { PlatoFuerteService } from './platosfuertes.service';
import { PlatoFuerteController } from './platosfuertes.controller'; // si lo tienes

@Module({
  imports: [TypeOrmModule.forFeature([PlatoFuerte])],
  providers: [PlatoFuerteService],
  controllers: [PlatoFuerteController], // si existe
  exports: [PlatoFuerteService], // si otro módulo necesita usarlo
})
export class PlatosFuertesModule {}
