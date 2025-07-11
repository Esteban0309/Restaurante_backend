import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Bebidas } from './bebidas.entity';
import { CreatebebidaDto } from './dto/create_bebidas';
import { UpdatebebidaDto } from './dto/update_bebidas';

@Injectable()
export class BebidasService {
  constructor(
    @InjectRepository(Bebidas)
    private readonly bebidasRepository: Repository<Bebidas>,
  ) {}

  async create(createbebidaDto: CreatebebidaDto): Promise<Bebidas> {
    const nuevaBebida = this.bebidasRepository.create(createbebidaDto);
    return await this.bebidasRepository.save(nuevaBebida);
  }

  async findAll(
    options: IPaginationOptions,
    isActive?: boolean,
  ): Promise<Pagination<Bebidas>> {
    const query = this.bebidasRepository.createQueryBuilder('bebida');
    if (isActive !== undefined) {
      query.where('bebida.disponibilidad = :isActive', { isActive });
    }
    return await paginate<Bebidas>(query, options);
  }

  async findOne(id: string): Promise<Bebidas | null> {
    return await this.bebidasRepository.findOne({ where: { id } });
  }

  async update(id: string, updatebebidaDto: UpdatebebidaDto): Promise<Bebidas | null> {
    const bebidaExistente = await this.bebidasRepository.findOne({ where: { id } });
    if (!bebidaExistente) return null;

    Object.assign(bebidaExistente, updatebebidaDto);
    return this.bebidasRepository.save(bebidaExistente);
  }

  async remove(id: string): Promise<Bebidas | null> {
    const bebida = await this.findOne(id);
    if (!bebida) return null;

    return await this.bebidasRepository.remove(bebida);
  }

  async updateProfile(id: string, filename: string): Promise<Bebidas | null> {
    const bebida = await this.findOne(id);
    if (!bebida) return null;

    bebida.profile = filename;
    return await this.bebidasRepository.save(bebida);
  }
}
