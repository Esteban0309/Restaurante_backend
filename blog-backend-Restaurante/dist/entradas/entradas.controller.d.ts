import { EntradasService } from './entradas.service';
import { CreateentradaDto } from './dto/create_entradas';
import { UpdateentradaDto } from './dto/update_entradas';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Entradas } from './entradas.entity';
export declare class EntradasController {
    private readonly entradasService;
    constructor(entradasService: EntradasService);
    create(dto: CreateentradaDto): Promise<SuccessResponseDto<Entradas>>;
    findAll(page?: number, limit?: number, isActive?: string): Promise<SuccessResponseDto<Pagination<Entradas>>>;
    findOne(id: string): Promise<SuccessResponseDto<Entradas>>;
    update(id: string, dto: UpdateentradaDto): Promise<SuccessResponseDto<Entradas>>;
    remove(id: string): Promise<SuccessResponseDto<Entradas>>;
    uploadProfile(id: string, file: Express.Multer.File): Promise<SuccessResponseDto<Entradas>>;
}
