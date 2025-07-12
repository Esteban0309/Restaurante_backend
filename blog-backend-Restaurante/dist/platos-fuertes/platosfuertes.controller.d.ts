import { platosfuertesService } from './platosfuertes.service';
import { CreatePlatoFuerteDto } from './dto/create_platosfuertes';
import { UpdatePlatoFuerteDto } from './dto/update_platosfuertes';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PlatoFuerte } from './platosfuertes.entity';
export declare class platosfuertesController {
    private readonly platosfuertesService;
    constructor(platosfuertesService: platosfuertesService);
    create(dto: CreatePlatoFuerteDto): Promise<SuccessResponseDto<PlatoFuerte>>;
    findAll(page?: number, limit?: number, isActive?: string): Promise<SuccessResponseDto<Pagination<PlatoFuerte>>>;
    findOne(id: string): Promise<SuccessResponseDto<PlatoFuerte>>;
    update(id: string, dto: UpdatePlatoFuerteDto): Promise<SuccessResponseDto<PlatoFuerte>>;
    remove(id: string): Promise<SuccessResponseDto<PlatoFuerte>>;
    uploadProfile(id: string, file: Express.Multer.File): Promise<SuccessResponseDto<PlatoFuerte>>;
}
