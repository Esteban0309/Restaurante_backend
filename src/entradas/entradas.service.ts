import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Entradas } from './entradas.entity';
import { CreateentradaDto } from './dto/create_entradas';
import { UpdateentradaDto } from './dto/update_entradas';

@Injectable()
export class EntradasService {
  constructor(
    @InjectRepository(Entradas)
    private readonly entradaRepository: Repository<Entradas>,
  ) {}

  async create(dto: CreateentradaDto): Promise<Entradas> {
    const nuevaEntrada = this.entradaRepository.create(dto);
    return this.entradaRepository.save(nuevaEntrada);
  }

  async findAll(
    options: IPaginationOptions,
    isActive?: boolean,
  ): Promise<Pagination<Entradas>> {
    const query = this.entradaRepository.createQueryBuilder('entrada');
    if (isActive !== undefined) {
      query.where('entrada.disponibilidad = :isActive', { isActive });
    }
    return paginate<Entradas>(query, options);
  }

  async findOne(id: string): Promise<Entradas | null> {
    return this.entradaRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateentradaDto): Promise<Entradas | null> {
    const entrada = await this.entradaRepository.findOne({ where: { id } });
    if (!entrada) return null;

    Object.assign(entrada, dto);
    return this.entradaRepository.save(entrada);
  }

  async remove(id: string): Promise<Entradas | null> {
    const entrada = await this.findOne(id);
    if (!entrada) return null;

    return this.entradaRepository.remove(entrada);
  }

  async updateProfile(id: string, filename: string): Promise<Entradas | null> {
    const entrada = await this.findOne(id);
    if (!entrada) return null;

    entrada.profile = filename;
    return this.entradaRepository.save(entrada);
  }
}
