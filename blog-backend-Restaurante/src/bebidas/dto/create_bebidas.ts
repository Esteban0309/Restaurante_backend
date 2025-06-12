import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity('posts')
export class CreatebebidaDto {
  @PrimaryGeneratedColumn('uuid')
  nombre: string;

  @Column()
  precio: number;

  @Column()
  tipo: string;

  @Column()
  descripcion: string;

  @Column({ default: true })
  disponibilidad: boolean;

}

