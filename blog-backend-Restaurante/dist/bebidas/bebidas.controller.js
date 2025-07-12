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
exports.BebidasController = void 0;
const common_1 = require("@nestjs/common");
const bebidas_service_1 = require("./bebidas.service");
const create_bebidas_1 = require("./dto/create_bebidas");
const update_bebidas_1 = require("./dto/update_bebidas");
const response_dto_1 = require("../common/dto/response.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let BebidasController = class BebidasController {
    bebidasService;
    constructor(bebidasService) {
        this.bebidasService = bebidasService;
    }
    async create(dto) {
        const bebida = await this.bebidasService.create(dto);
        return new response_dto_1.SuccessResponseDto('Bebida creada exitosamente', bebida);
    }
    async findAll(page = 1, limit = 10, isActive) {
        if (isActive !== undefined &&
            isActive !== 'true' &&
            isActive !== 'false') {
            throw new common_1.BadRequestException('Valor inválido para "isActive". Usa "true" o "false".');
        }
        const result = await this.bebidasService.findAll({ page, limit }, isActive === 'true' ? true : isActive === 'false' ? false : undefined);
        if (!result)
            throw new common_1.InternalServerErrorException('No se pudieron obtener las bebidas');
        return new response_dto_1.SuccessResponseDto('Bebidas obtenidas exitosamente', result);
    }
    async findOne(id) {
        const bebida = await this.bebidasService.findOne(id);
        if (!bebida)
            throw new common_1.NotFoundException('Bebida no encontrada');
        return new response_dto_1.SuccessResponseDto('Bebida obtenida exitosamente', bebida);
    }
    async update(id, dto) {
        const bebida = await this.bebidasService.update(id, dto);
        if (!bebida)
            throw new common_1.NotFoundException('Bebida no encontrada');
        return new response_dto_1.SuccessResponseDto('Bebida actualizada exitosamente', bebida);
    }
    async remove(id) {
        const bebida = await this.bebidasService.remove(id);
        if (!bebida)
            throw new common_1.NotFoundException('Bebida no encontrada');
        return new response_dto_1.SuccessResponseDto('Bebida eliminada exitosamente', bebida);
    }
    async uploadProfile(id, file) {
        if (!file)
            throw new common_1.BadRequestException('Se requiere imagen de perfil');
        const bebida = await this.bebidasService.updateProfile(id, file.filename);
        if (!bebida)
            throw new common_1.NotFoundException('Bebida no encontrada');
        return new response_dto_1.SuccessResponseDto('Imagen de perfil actualizada', bebida);
    }
};
exports.BebidasController = BebidasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bebidas_1.CreatebebidaDto]),
    __metadata("design:returntype", Promise)
], BebidasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], BebidasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BebidasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bebidas_1.UpdatebebidaDto]),
    __metadata("design:returntype", Promise)
], BebidasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BebidasController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/profile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profile', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/profile',
            filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return cb(new common_1.BadRequestException('Solo archivos JPG o PNG están permitidos'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BebidasController.prototype, "uploadProfile", null);
exports.BebidasController = BebidasController = __decorate([
    (0, common_1.Controller)('bebidas'),
    __metadata("design:paramtypes", [bebidas_service_1.BebidasService])
], BebidasController);
//# sourceMappingURL=bebidas.controller.js.map