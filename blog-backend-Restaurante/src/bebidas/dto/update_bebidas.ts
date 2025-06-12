import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';


@Entity('dishes')  
export class UpdatebebidaDto {
  @PrimaryGeneratedColumn('uuid')
  nombre?: string;

  @Column('decimal')
  precio?: number;

  @Column()
  tipo?: string;

  @Column({ nullable: true })
  descripcion?: string;

  @Column({ default: true })
  disponibilidad?: boolean;


}

