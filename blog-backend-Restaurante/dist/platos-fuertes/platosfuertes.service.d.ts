import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { PlatoFuerte } from './platosfuertes.entity';
import { CreatePlatoFuerteDto } from './dto/create_platosfuertes';
import { UpdatePlatoFuerteDto } from './dto/update_platosfuertes';
export declare class platosfuertesService {
    private readonly platosfuertesRepository;
    constructor(platosfuertesRepository: Repository<PlatoFuerte>);
    create(dto: CreatePlatoFuerteDto): Promise<PlatoFuerte>;
    findAll(options: IPaginationOptions, isActive?: boolean): Promise<Pagination<PlatoFuerte>>;
    findOne(id: string): Promise<PlatoFuerte | null>;
    update(id: string, dto: UpdatePlatoFuerteDto): Promise<PlatoFuerte | null>;
    remove(id: string): Promise<PlatoFuerte | null>;
    updateProfile(id: string, filename: string): Promise<PlatoFuerte | null>;
}
