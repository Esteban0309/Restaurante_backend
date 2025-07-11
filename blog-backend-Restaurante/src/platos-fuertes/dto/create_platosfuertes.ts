import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreatePlatoFuerteDto {
  @IsString()
  nombre: string;

  @IsNumber()
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
