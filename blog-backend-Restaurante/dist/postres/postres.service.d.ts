import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Postre } from './postres.entity';
import { CreatePostreDto } from './dto/create_postres';
import { UpdatePostreDto } from './dto/update_postres';
export declare class PostresService {
    private readonly postreRepository;
    constructor(postreRepository: Repository<Postre>);
    create(dto: CreatePostreDto): Promise<Postre | null>;
    findAll(options: IPaginationOptions, isActive?: boolean): Promise<Pagination<Postre> | null>;
    findOne(id: string): Promise<Postre | null>;
    findByNombre(nombre: string): Promise<Postre | null>;
    update(id: string, dto: UpdatePostreDto): Promise<Postre | null>;
    remove(id: string): Promise<Postre | null>;
    updateProfile(id: string, filename: string): Promise<Postre | null>;
}
