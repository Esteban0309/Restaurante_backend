import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('platosfuertes')
export class PlatoFuerte {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'varchar', length: 100 })
  nombre: string;

  @Column({ type: 'float' })
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
