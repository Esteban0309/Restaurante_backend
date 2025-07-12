import { IsString, IsNumber, IsOptional, IsBoolean } from 'class-validator';
import { Column } from 'typeorm';

export class UpdatePostreDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio?: number;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

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
