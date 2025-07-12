import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { Column } from 'typeorm';

export class CreatePostreDto {
  @IsString()
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
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
