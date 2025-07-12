import { IsDecimal } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('platosfuertes')
export class PlatoFuerte {
  @PrimaryGeneratedColumn('uuid')
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
  Porciones: string;

  @Column({ default: true })
  disponibilidad: boolean;

  @Column({ nullable: true })
  profile?: string;
}
