import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Bebidas } from './bebidas.entity';
import { CreatebebidaDto } from './dto/create_bebidas';
import { UpdatebebidaDto } from './dto/update_bebidas';
export declare class BebidasService {
    private readonly bebidasRepository;
    constructor(bebidasRepository: Repository<Bebidas>);
    create(createbebidaDto: CreatebebidaDto): Promise<Bebidas>;
    findAll(options: IPaginationOptions, isActive?: boolean): Promise<Pagination<Bebidas>>;
    findOne(id: string): Promise<Bebidas | null>;
    update(id: string, updatebebidaDto: UpdatebebidaDto): Promise<Bebidas | null>;
    remove(id: string): Promise<Bebidas | null>;
    updateProfile(id: string, filename: string): Promise<Bebidas | null>;
}
