import { Type } from 'class-transformer';
import { IsDecimal, IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class UpdateentradaDto {
  @PrimaryGeneratedColumn()
  nombre?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column()
  tipo?: string;

  @Column()
  descripcion?: string;

  @Column({ nullable: true })
  Porciones: string;

  @Column({ default: true })
  disponibilidad: boolean;
}