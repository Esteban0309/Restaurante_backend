import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('dishes')
export class UpdateentradaDto {
  @PrimaryGeneratedColumn('uuid')
  nombre?: string;

  @Column('decimal')
  precio?:number;

  @Column()
  tipo?: string;

  @Column()
  descripcion?:string;
  
  @Column({ nullable: true })
  Porciones?: string;
  
  @Column({ default: true })
  disponibilidad?: boolean;


}