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
export class platosfuertesService {
  constructor(
    @InjectRepository(PlatoFuerte)
    private readonly platosfuertesRepository: Repository<PlatoFuerte>,
  ) {}

  async create(dto: CreatePlatoFuerteDto): Promise<PlatoFuerte> {
    const nuevaplatosfuertes = this.platosfuertesRepository.create(dto);
    return this.platosfuertesRepository.save(nuevaplatosfuertes);
  }

  async findAll(
    options: IPaginationOptions,
    isActive?: boolean,
  ): Promise<Pagination<PlatoFuerte>> {
    const query = this.platosfuertesRepository.createQueryBuilder('platosfuertes');
    if (isActive !== undefined) {
      query.where('platosfuertes.disponibilidad = :isActive', { isActive });
    }
    return paginate<PlatoFuerte>(query, options);
  }

  async findOne(id: number): Promise<PlatoFuerte | null> {
    return this.platosfuertesRepository.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdatePlatoFuerteDto): Promise<PlatoFuerte | null> {
    const platosfuertes = await this.platosfuertesRepository.findOne({ where: { id } });
    if (!platosfuertes) return null;

    Object.assign(platosfuertes, dto);
    return this.platosfuertesRepository.save(platosfuertes);
  }

  async remove(id: number): Promise<PlatoFuerte | null> {
    const platosfuertes = await this.findOne(id);
    if (!platosfuertes) return null;

    return this.platosfuertesRepository.remove(platosfuertes);
  }

  async updateProfile(id: number, filename: string): Promise<PlatoFuerte | null> {
    const platosfuertes = await this.findOne(id);
    if (!platosfuertes) return null;

    platosfuertes.profile = filename;
    return this.platosfuertesRepository.save(platosfuertes);
  }
}
