import { Type } from 'class-transformer';
import { IsDecimal, IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity() // 
export class Bebidas {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nombre: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number;

  @Column()
  tipo: string;

  @Column()
  descripcion: string;

  @Column({ default: true })
  disponibilidad: boolean;

  @Column({ nullable: true })
  profile?: string;
}

