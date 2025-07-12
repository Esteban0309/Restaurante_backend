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
exports.EntradasController = void 0;
const common_1 = require("@nestjs/common");
const entradas_service_1 = require("./entradas.service");
const create_entradas_1 = require("./dto/create_entradas");
const update_entradas_1 = require("./dto/update_entradas");
const response_dto_1 = require("../common/dto/response.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let EntradasController = class EntradasController {
    entradasService;
    constructor(entradasService) {
        this.entradasService = entradasService;
    }
    async create(dto) {
        const entrada = await this.entradasService.create(dto);
        return new response_dto_1.SuccessResponseDto('Entrada creada exitosamente', entrada);
    }
    async findAll(page = 1, limit = 10, isActive) {
        if (isActive !== undefined &&
            isActive !== 'true' &&
            isActive !== 'false') {
            throw new common_1.BadRequestException('Valor inválido para "isActive". Usa "true" o "false".');
        }
        const result = await this.entradasService.findAll({ page, limit }, isActive === 'true' ? true : isActive === 'false' ? false : undefined);
        if (!result)
            throw new common_1.InternalServerErrorException('No se pudieron obtener las entradas');
        return new response_dto_1.SuccessResponseDto('Entradas obtenidas exitosamente', result);
    }
    async findOne(id) {
        const entrada = await this.entradasService.findOne(id);
        if (!entrada)
            throw new common_1.NotFoundException('Entrada no encontrada');
        return new response_dto_1.SuccessResponseDto('Entrada obtenida exitosamente', entrada);
    }
    async update(id, dto) {
        const entrada = await this.entradasService.update(id, dto);
        if (!entrada)
            throw new common_1.NotFoundException('Entrada no encontrada');
        return new response_dto_1.SuccessResponseDto('Entrada actualizada exitosamente', entrada);
    }
    async remove(id) {
        const entrada = await this.entradasService.remove(id);
        if (!entrada)
            throw new common_1.NotFoundException('Entrada no encontrada');
        return new response_dto_1.SuccessResponseDto('Entrada eliminada exitosamente', entrada);
    }
    async uploadProfile(id, file) {
        if (!file)
            throw new common_1.BadRequestException('Se requiere una imagen de perfil');
        const entrada = await this.entradasService.updateProfile(id, file.filename);
        if (!entrada)
            throw new common_1.NotFoundException('Entrada no encontrada');
        return new response_dto_1.SuccessResponseDto('Imagen de perfil actualizada', entrada);
    }
};
exports.EntradasController = EntradasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_entradas_1.CreateentradaDto]),
    __metadata("design:returntype", Promise)
], EntradasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], EntradasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EntradasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_entradas_1.UpdateentradaDto]),
    __metadata("design:returntype", Promise)
], EntradasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EntradasController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)(':id/profile'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profile', {
        storage: (0, multer_1.diskStorage)({
            destination: './public/profile',
            filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
        }),
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
                return cb(new common_1.BadRequestException('Solo se permiten archivos JPG o PNG'), false);
            }
            cb(null, true);
        },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EntradasController.prototype, "uploadProfile", null);
exports.EntradasController = EntradasController = __decorate([
    (0, common_1.Controller)('entradas'),
    __metadata("design:paramtypes", [entradas_service_1.EntradasService])
], EntradasController);
//# sourceMappingURL=entradas.controller.js.map