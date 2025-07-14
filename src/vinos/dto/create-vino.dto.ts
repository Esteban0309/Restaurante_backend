import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';

export class CreateVinoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsNumber()
  precioCopa?: number | null;
  
  @IsOptional()
  @IsNumber()
  precioBotella?: number | null;

  @IsString()
  tipo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

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
