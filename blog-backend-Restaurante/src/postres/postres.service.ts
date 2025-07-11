import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Postre } from './postres.entity';
import { CreatePostreDto } from './dto/create_postres';
import { UpdatePostreDto } from './dto/update_postres';

@Injectable()
export class PostresService {
  constructor(
    @InjectRepository(Postre)
    private readonly postreRepository: Repository<Postre>,
  ) {}

  async create(dto: CreatePostreDto): Promise<Postre | null> {
    try {
      const nuevoPostre = this.postreRepository.create(dto);
      return await this.postreRepository.save(nuevoPostre);
    } catch (err) {
      console.error('Error al crear postre:', err);
      return null;
    }
  }

  async findAll(
    options: IPaginationOptions,
    isActive?: boolean,
  ): Promise<Pagination<Postre> | null> {
    try {
      const query = this.postreRepository.createQueryBuilder('postre');
      if (isActive !== undefined) {
        query.where('postre.disponibilidad = :isActive', { isActive });
      }
      return await paginate<Postre>(query, options);
    } catch (err) {
      console.error('Error al listar postres:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Postre | null> {
    try {
      return await this.postreRepository.findOne({ where: { id: Number(id) } });
    } catch (err) {
      console.error('Error al buscar postre:', err);
      return null;
    }
  }
  

  async findByNombre(nombre: string): Promise<Postre | null> {
    try {
      return await this.postreRepository.findOne({ where: { nombre } });
    } catch (err) {
      console.error('Error al buscar por nombre:', err);
      return null;
    }
  }

  async update(id: string, dto: UpdatePostreDto): Promise<Postre | null> {
    try {
      const postre = await this.findOne(id);
      if (!postre) return null;

      Object.assign(postre, dto);
      return await this.postreRepository.save(postre);
    } catch (err) {
      console.error('Error al actualizar postre:', err);
      return null;
    }
  }

  async remove(id: string): Promise<Postre | null> {
    try {
      const postre = await this.findOne(id);
      if (!postre) return null;

      return await this.postreRepository.remove(postre);
    } catch (err) {
      console.error('Error al eliminar postre:', err);
      return null;
    }
  }

  async updateProfile(id: string, filename: string): Promise<Postre | null> {
    try {
      const postre = await this.findOne(id);
      if (!postre) return null;

      postre.profile = filename;
      return await this.postreRepository.save(postre);
    } catch (err) {
      console.error('Error al actualizar imagen de postre:', err);
      return null;
    }
  }
}
