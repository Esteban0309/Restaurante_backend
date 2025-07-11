import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity() // 
export class Bebidas {
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

  @Column({ default: true })
  disponibilidad: boolean;

  @Column({ nullable: true })
  profile?: string;
}

