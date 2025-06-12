import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { PlatoFuerte } from './platosfuertes.entity';
import { CreatePlatoFuerteDto } from './dto/create_platosfuertes';
import { UpdatePlatoFuerteDto } from './dto/update_platosfuertes';

@Injectable()
export class PlatoFuerteService {
  constructor(
    @InjectRepository(PlatoFuerte)
    private readonly platoFuerteRepository: Repository<PlatoFuerte>,
  ) {}

  async create(createPlatoFuerteDto: CreatePlatoFuerteDto): Promise<PlatoFuerte | null> {
    try {
      const nuevoPlato = this.platoFuerteRepository.create(createPlatoFuerteDto);
      return await this.platoFuerteRepository.save(nuevoPlato);
    } catch (err) {
      console.error('Error al crear plato fuerte:', err);
      return null;
    }
  }

  async findAll(
    options: IPaginationOptions,
    isActive?: boolean,
  ): Promise<Pagination<PlatoFuerte> | null> {
    try {
      const query = this.platoFuerteRepository.createQueryBuilder('plato');
      if (isActive !== undefined) {
        query.where('plato.disponibilidad = :isActive', { isActive });
      }
      return await paginate<PlatoFuerte>(query, options);
    } catch (err) {
      console.error('Error al listar platos fuertes:', err);
      return null;
    }
  }

  async findOne(id: number): Promise<PlatoFuerte | null> {
    try {
      return await this.platoFuerteRepository.findOne({ where: { id } });
    } catch (err) {
      console.error('Error al buscar plato fuerte:', err);
      return null;
    }
  }

  async findByNombre(nombre: string): Promise<PlatoFuerte | null> {
    try {
      return await this.platoFuerteRepository.findOne({ where: { nombre } });
    } catch (err) {
      console.error('Error al buscar por nombre:', err);
      return null;
    }
  }

  async update(id: number, updatePlatoFuerteDto: UpdatePlatoFuerteDto): Promise<PlatoFuerte | null> {
    try {
      const plato = await this.platoFuerteRepository.findOne({ where: { id } });
      if (!plato) return null;

      Object.assign(plato, updatePlatoFuerteDto);
      return await this.platoFuerteRepository.save(plato);
    } catch (err) {
      console.error('Error al actualizar plato fuerte:', err);
      return null;
    }
  }

  async remove(id: number): Promise<PlatoFuerte | null> {
    try {
      const plato = await this.findOne(id);
      if (!plato) return null;

      return await this.platoFuerteRepository.remove(plato);
    } catch (err) {
      console.error('Error al eliminar plato fuerte:', err);
      return null;
    }
  }

  async updateProfile(id: number, filename: string): Promise<PlatoFuerte | null> {
    try {
      const plato = await this.findOne(id);
      if (!plato) return null;

      plato.profile = filename;
      return await this.platoFuerteRepository.save(plato);
    } catch (err) {
      console.error('Error al actualizar imagen del plato:', err);
      return null;
    }
  }
}
