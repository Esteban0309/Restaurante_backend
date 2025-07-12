import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, IsOptional, IsDecimal } from 'class-validator';
import { Column } from 'typeorm';

export class CreateentradaDto {
  @IsOptional()  // si quieres que sea opcional, sino eliminar esta línea
  @IsString()
  porciones?: string;

  @IsString()
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @IsString()
  tipo: string;

  @IsString()
  descripcion: string;

  @IsBoolean()
  @IsOptional()
  disponibilidad?: boolean; // si quieres que sea opcional, si no eliminar IsOptional
}
