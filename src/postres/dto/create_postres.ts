import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { Column } from 'typeorm';

export class CreatePostreDto {
  @IsOptional()  // si quieres que sea opcional, sino eliminar esta línea
  @IsString()
  porciones?: string;

  @IsString()
  nombre: string;

  @IsNumber()
  precio: number;

  @IsString()
  tipo: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsBoolean()
  @IsOptional()
  disponibilidad?: boolean;
}
