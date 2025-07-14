import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateVinoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  precioCopa: number;

  @IsNumber()
  precioBotella: number;

  @IsString()
  tipo: string;

  @IsOptional()
  @IsString()
  descripcion: string;

  @IsOptional()
  @IsString()
  Porciones?: string;

  @IsOptional()
  @IsBoolean()
  disponibilidad?: boolean;

  @IsOptional()
  @IsString()
  profile?: string;
}
