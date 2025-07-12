import { PostresService } from './postres.service';
import { SuccessResponseDto } from 'src/common/dto/response.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Postre } from './postres.entity';
import { CreatePostreDto } from './dto/create_postres';
import { UpdatePostreDto } from './dto/update_postres';
export declare class PostresController {
    private readonly PostresService;
    constructor(PostresService: PostresService);
    create(dto: CreatePostreDto): Promise<SuccessResponseDto<Postre | null>>;
    findAll(page?: number, limit?: number, isActive?: string): Promise<SuccessResponseDto<Pagination<Postre>>>;
    findOne(id: string): Promise<SuccessResponseDto<Postre>>;
    update(id: string, dto: UpdatePostreDto): Promise<SuccessResponseDto<Postre>>;
    remove(id: string): Promise<SuccessResponseDto<Postre>>;
    uploadProfile(id: string, file: Express.Multer.File): Promise<SuccessResponseDto<Postre>>;
}
