import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity()
export class CreatePlatoFuerteDto {
  @PrimaryGeneratedColumn('uuid')
  nombre: string;

  @Column('decimal')
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