import { Type } from 'class-transformer';
import { IsDecimal, IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('entradas') // usa un nombre más específico que 'posts'
export class Entradas {
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

  @Column({ nullable: true })
  porciones: string;

  @Column({ default: true })
  disponibilidad: boolean;

  @Column({ nullable: true })
  profile?: string; // si vas a subir imágenes
}
