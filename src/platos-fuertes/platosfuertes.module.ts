import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatoFuerte } from './platosfuertes.entity';
import { platosfuertesService } from './platosfuertes.service';
import { platosfuertesController } from './platosfuertes.controller'; // si lo tienes

@Module({
  imports: [TypeOrmModule.forFeature([PlatoFuerte])],
  providers: [platosfuertesService],
  controllers: [platosfuertesController], // si existe
  exports: [platosfuertesService], // si otro módulo necesita usarlo
})
export class PlatosFuertesModule {}
