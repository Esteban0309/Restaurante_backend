// bebidas.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bebidas } from './bebidas.entity';
import { BebidasService } from './bebidas.service';
import { BebidasController } from './bebidas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Bebidas])],
  controllers: [BebidasController],
  providers: [BebidasService],
  exports: [BebidasService], // opcional si se usa en otros módulos
})
export class BebidasModule {}
