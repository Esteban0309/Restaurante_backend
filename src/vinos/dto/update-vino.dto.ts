import { PartialType } from '@nestjs/mapped-types';
import { CreateVinoDto } from './create-vino.dto';
import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateVinoDto  {
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
