import { Type } from 'class-transformer';
import { IsBoolean, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateentradaDto {
  @IsOptional()  // si quieres que sea opcional, sino eliminar esta línea
  @IsString()
  porciones?: string;

  @IsString()
  nombre: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'precio must be a valid decimal number with up to 2 decimal places' })
  precio: number;

  @IsString()
  tipo: string;

  @IsString()
  descripcion: string;

  @IsBoolean()
  @IsOptional()
  disponibilidad?: boolean; // si quieres que sea opcional, si no eliminar IsOptional
}
