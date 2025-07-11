import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreatePostreDto {
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
  porciones?: string;

  @IsOptional()
  @IsBoolean()
  disponibilidad?: boolean;

  @IsOptional()
  @IsString()
  profile?: string;
}
