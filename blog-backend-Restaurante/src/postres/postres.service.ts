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
export class postresService {
  constructor(
    @InjectRepository(Postre)
    private readonly postreRepository: Repository<Postre>,
  ) {}

  async create(dto: CreatePostreDto): Promise<Postre> {
    const nuevapostre = this.postreRepository.create(dto);
    return this.postreRepository.save(nuevapostre);
  }

  async findAll(
    options: IPaginationOptions,
    isActive?: boolean,
  ): Promise<Pagination<Postre>> {
    const query = this.postreRepository.createQueryBuilder('postre');
    if (isActive !== undefined) {
      query.where('postre.disponibilidad = :isActive', { isActive });
    }
    return paginate<Postre>(query, options);
  }

  async findOne(id: string): Promise<Postre | null> {
    return this.postreRepository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdatePostreDto): Promise<Postre | null> {
    const postre = await this.postreRepository.findOne({ Where: { id } });
    if (!postre) return null;

    Object.assign(postre, dto);
    return this.postreRepository.save(postre);
  }

  async remove(id: string): Promise<Postre | null> {
    const postre = await this.findOne(id);
    if (!postre) return null;

    return this.postreRepository.remove(postre);
  }

  async updateProfile(id: string, filename: string): Promise<Postre | null> {
    const postre = await this.findOne(id);
    if (!postre) return null;

    postre.profile = filename;
    return this.postreRepository.save(postre);
  }
}
