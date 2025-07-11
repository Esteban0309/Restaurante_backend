import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class UpdateentradaDto {
  @PrimaryGeneratedColumn()
  nombre: string;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'precio must be a valid decimal number with up to 2 decimal places' })
  precio: number;

  @Column()
  tipo: string;

  @Column()
  descripcion: string;

  @Column({ nullable: true })
  Porciones: string;

  @Column({ default: true })
  disponibilidad: boolean;
}