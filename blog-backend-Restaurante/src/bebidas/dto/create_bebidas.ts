import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatebebidaDto {
  @IsString()
  nombre: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'mas de dos decimales' })
  precio: number;

  @IsString()
  tipo: string;

  @IsString()
  @IsOptional()
  descripcion?: string;

  @IsBoolean()
  @IsOptional()
  disponibilidad?: boolean;
}
