import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Entradas } from './entradas.entity';
import { CreateentradaDto } from './dto/create_entradas';
import { UpdateentradaDto } from './dto/update_entradas';
export declare class EntradasService {
    private readonly entradaRepository;
    constructor(entradaRepository: Repository<Entradas>);
    create(dto: CreateentradaDto): Promise<Entradas>;
    findAll(options: IPaginationOptions, isActive?: boolean): Promise<Pagination<Entradas>>;
    findOne(id: string): Promise<Entradas | null>;
    update(id: string, dto: UpdateentradaDto): Promise<Entradas | null>;
    remove(id: string): Promise<Entradas | null>;
    updateProfile(id: string, filename: string): Promise<Entradas | null>;
}
