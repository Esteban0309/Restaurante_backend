import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { Column } from 'typeorm';

export class UpdatePlatoFuerteDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  Porciones?: string;

  @IsOptional()
  @IsBoolean()
  disponibilidad?: boolean;
}
