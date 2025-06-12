import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('bebidas') // 
export class bebida {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
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

