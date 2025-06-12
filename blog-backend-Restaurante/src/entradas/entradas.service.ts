import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { entrada } from './entradas.entity';
import { CreateentradaDto } from './dto/create_entradas';
import { UpdateentradaDto } from './dto/update_entradas';

@Injectable()
export class EntradasService {
  constructor(
    @InjectRepository(entrada)
    private readonly entradaRepository: Repository<entrada>,
  ) {}

  async create(CreateentradaDto: CreateentradaDto): Promise<entrada | null> {
    try {
      const nuevaEntrada = this.entradaRepository.create(CreateentradaDto);
      return await this.entradaRepository.save(nuevaEntrada);
    } catch (err) {
      console.error('Error al crear entrada:', err);
      return null;
    }
  }

  async findAll(
    options: IPaginationOptions,
    isActive?: boolean,
  ): Promise<Pagination<entrada> | null> {
    try {
      const query = this.entradaRepository.createQueryBuilder('entrada');
      if (isActive !== undefined) {
        query.where('entrada.disponibilidad = :isActive', { isActive });
      }
      return await paginate<entrada>(query, options);
    } catch (err) {
      console.error('Error al listar entradas:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<entrada | null> {
    try {
      return await this.entradaRepository.findOne({ where: { id } });
    } catch (err) {
      console.error('Error al buscar entrada:', err);
      return null;
    }
  }

  async findByNombre(nombre: string): Promise<entrada | null> {
    try {
      return await this.entradaRepository.findOne({ where: { nombre } });
    } catch (err) {
      console.error('Error al buscar entrada por nombre:', err);
      return null;
    }
  }

  async update(id: string, UpdateentradaDto: UpdateentradaDto): Promise<entrada | null> {
    try {
      const entradaExistente = await this.entradaRepository.findOne({ where: { id } });
      if (!entradaExistente) return null;

      Object.assign(entradaExistente, UpdateentradaDto);
      return await this.entradaRepository.save(entradaExistente);
    } catch (err) {
      console.error('Error al actualizar entrada:', err);
      return null;
    }
  }

  async remove(id: string): Promise<entrada | null> {
    try {
      const entrada = await this.findOne(id);
      if (!entrada) return null;

      return await this.entradaRepository.remove(entrada);
    } catch (err) {
      console.error('Error al eliminar entrada:', err);
      return null;
    }
  }

  async updateProfile(id: string, filename: string): Promise<entrada | null> {
    try {
      const entrada = await this.findOne(id);
      if (!entrada) return null;

      entrada.profile = filename;
      return await this.entradaRepository.save(entrada);
    } catch (err) {
      console.error('Error al actualizar imagen de entrada:', err);
      return null;
    }
  }
}
