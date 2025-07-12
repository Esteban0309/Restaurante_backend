import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { Column } from 'typeorm';

export class UpdatebebidaDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsNumber()
  precio: number;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsBoolean()
  disponibilidad?: boolean;
}
