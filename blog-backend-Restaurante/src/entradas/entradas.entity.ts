import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('entradas') // usa un nombre más específico que 'posts'
export class entrada {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
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
