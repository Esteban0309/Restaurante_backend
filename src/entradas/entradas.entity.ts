import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('entradas') // usa un nombre más específico que 'posts'
export class Entradas {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nombre: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'precio must be a valid decimal number with up to 2 decimal places' })
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
