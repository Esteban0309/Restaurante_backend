import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { Column } from 'typeorm';

export class CreatePlatoFuerteDto {
  @IsString()
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @IsString()
  tipo: string;

  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  Porciones?: string;

  @IsOptional()
  @IsBoolean()
  disponibilidad?: boolean;
}
