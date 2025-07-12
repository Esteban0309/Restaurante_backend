"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostresController = void 0;
const common_1 = require("@nestjs/common");
const postres_service_1 = require("./postres.service");
const response_dto_1 = require("../common/dto/response.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const create_postres_1 = require("./dto/create_postres");
const update_postres_1 = require("./dto/update_postres");
let PostresController = class PostresController {
    PostresService;
    constructor(PostresService) {
        this.PostresService = PostresService;
    }
    async create(dto) {
        const Postre = await this.PostresService.create(dto);
        return new response_dto_1.SuccessResponseDto('Postre created successfully', Postre);
    }
    async findAll(page = 1, limit = 10, isActive) {
        if (isActive !== undefined && isActive !== 'true' && isActive !== 'false') {
            throw new common_1.BadRequestException('Invalid value for "isActive". Use "true" or "false".');
        }
        const result = await this.PostresService.findAll({ page, limit }, isActive === 'true');
        if (!result)
            throw new common_1.InternalServerErrorException('Could not retrieve Postres');
        return new response_dto_1.SuccessResponseDto('Postres retrieved successfully', result);
    }
    async findOne(id) {
        const Postre = await this.PostresService.findOne(id);
        if (!Postre)
            throw new common_1.NotFoundException('Postre not found');
        return new response_dto_1.SuccessResponseDto('Postre retrieved successfully', Postre);
    }
    async update(id, dto) {
        const Postre = await this.PostresService.update(id, dto);
        if (!Postre)
            throw new common_1.NotFoundException('Postre not found');
        return new response_dto_1.SuccessResponseDto('Postre updated successfully', Postre);
    }
    async remove(id) {
        const Postre = await this.PostresService.remove(id);
        if (!Postre)
            throw new common_1.NotFoundException('Postre not found');
        return new response_dto_1.SuccessResponseDto('Postre deleted successfully', Postre);
    }
    async uploadProfile(id, file) {
        if (!file)
            throw new common_1.BadRequestException('Profile image is required');
        const Postre = await this.PostresService.updateProfile(id, file.filename);
        if (!Postre)
            throw new common_1.NotFoundException('Postre not found');
        return new response_dto_1.SuccessResponseDto('Profile image updated', Postre);
    }
};
exports.PostresController = PostresController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_postres_1.CreatePostreDto]),
    __metadata("design:returntype", Promise)
], PostresController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], PostresController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostresController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_postres_1.UpdatePostreDto]),
    __metadata("design:returntype", Promise)
], PostresController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PostresController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/profile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profile', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/profile',
            filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return cb(new common_1.BadRequestException('Only JPG or PNG files are allowed'), false);
            }
            cb(null, true);
        }
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PostresController.prototype, "uploadProfile", null);
exports.PostresController = PostresController = __decorate([
    (0, common_1.Controller)('Postres'),
    __metadata("design:paramtypes", [postres_service_1.PostresService])
], PostresController);
//# sourceMappingURL=postres.controller.js.map