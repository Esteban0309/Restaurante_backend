import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('postres')
export class Postre {
  @PrimaryGeneratedColumn()
  id: number;  // identificador único correcto

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
  profile?: string;
}
