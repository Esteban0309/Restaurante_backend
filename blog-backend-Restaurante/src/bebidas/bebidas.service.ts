import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { bebida } from './bebidas.entity';
import { CreatebebidaDto } from './dto/create_bebidas';
import { UpdatebebidaDto } from './dto/update_bebidas';

@Injectable()
export class bebidasService {
  constructor(
    @InjectRepository(bebida)
    private readonly bebidaRepository: Repository<bebida>,
  ) {}

  async create(createbebidaDto: CreatebebidaDto): Promise<bebida | null> {
    try {
      const nuevaBebida = this.bebidaRepository.create(createbebidaDto);
      return await this.bebidaRepository.save(nuevaBebida);
    } catch (err) {
      console.error('Error creating bebida:', err);
      return null;
    }
  }

  async findAll(
    options: IPaginationOptions,
    isActive?: boolean,
  ): Promise<Pagination<bebida> | null> {
    try {
      const query = this.bebidaRepository.createQueryBuilder('bebida');
      if (isActive !== undefined) {
        query.where('bebida.disponibilidad = :isActive', { isActive });
      }
      return await paginate<bebida>(query, options);
    } catch (err) {
      console.error('Error retrieving bebidas:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<bebida | null> {
    try {
      return await this.bebidaRepository.findOne({ where: { id } });
    } catch (err) {
      console.error('Error finding bebida:', err);
      return null;
    }
  }

  async findByNombre(nombre: string): Promise<bebida | null> {
    try {
      return await this.bebidaRepository.findOne({ where: { nombre } });
    } catch (err) {
      console.error('Error finding bebida by nombre:', err);
      return null;
    }
  }

  async update(id: string, updatebebidaDto: UpdatebebidaDto): Promise<bebida | null> {
    try {
      const bebidaExistente = await this.bebidaRepository.findOne({ where: { id } });
      if (!bebidaExistente) return null;

      Object.assign(bebidaExistente, updatebebidaDto);
      return this.bebidaRepository.save(bebidaExistente);
    } catch (err) {
      console.error('Error updating bebida:', err);
      return null;
    }
  }

  async remove(id: string): Promise<bebida | null> {
    try {
      const bebida = await this.findOne(id);
      if (!bebida) return null;

      return await this.bebidaRepository.remove(bebida);
    } catch (err) {
      console.error('Error deleting bebida:', err);
      return null;
    }
  }

  async updateProfile(id: string, filename: string): Promise<bebida | null> {
    try {
      const bebida = await this.findOne(id);
      if (!bebida) return null;

      bebida.profile = filename;
      return await this.bebidaRepository.save(bebida);
    } catch (err) {
      console.error('Error updating bebida profile image:', err);
      return null;
    }
  }
}
