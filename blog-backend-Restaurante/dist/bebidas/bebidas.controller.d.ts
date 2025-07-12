import { BebidasService } from './bebidas.service';
import { CreatebebidaDto } from './dto/create_bebidas';
import { UpdatebebidaDto } from './dto/update_bebidas';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Bebidas } from './bebidas.entity';
export declare class BebidasController {
    private readonly bebidasService;
    constructor(bebidasService: BebidasService);
    create(dto: CreatebebidaDto): Promise<SuccessResponseDto<Bebidas>>;
    findAll(page?: number, limit?: number, isActive?: string): Promise<SuccessResponseDto<Pagination<Bebidas>>>;
    findOne(id: string): Promise<SuccessResponseDto<Bebidas>>;
    update(id: string, dto: UpdatebebidaDto): Promise<SuccessResponseDto<Bebidas>>;
    remove(id: string): Promise<SuccessResponseDto<Bebidas>>;
    uploadProfile(id: string, file: Express.Multer.File): Promise<SuccessResponseDto<Bebidas>>;
}
