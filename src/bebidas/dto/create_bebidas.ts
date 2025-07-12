import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { Column } from 'typeorm';

export class CreatebebidaDto {
  @IsOptional()  // si quieres que sea opcional, sino eliminar esta línea
  @IsString()
  porciones?: string;

  @IsString()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsString()
  tipo: string;

  @IsString()
  descripcion: string;

  @IsBoolean()
  @IsOptional()
  disponibilidad?: boolean;
}
