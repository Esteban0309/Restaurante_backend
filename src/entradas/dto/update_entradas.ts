import { Type } from 'class-transformer';
import { IsDecimal, IsNumber, IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class UpdateentradaDto {
  @IsOptional()
  @Column()
  nombre?: string;

  @IsOptional()
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @IsOptional()
  @Column()
  tipo?: string;

  @IsOptional()
  @Column()
  descripcion?: string;

  @IsOptional()
  @Column({ nullable: true })
  Porciones: string;

  @IsOptional()
  @Column({ default: true })
  disponibilidad: boolean;
}