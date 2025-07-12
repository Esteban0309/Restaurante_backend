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
exports.platosfuertesController = void 0;
const common_1 = require("@nestjs/common");
const platosfuertes_service_1 = require("./platosfuertes.service");
const create_platosfuertes_1 = require("./dto/create_platosfuertes");
const update_platosfuertes_1 = require("./dto/update_platosfuertes");
const response_dto_1 = require("../common/dto/response.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let platosfuertesController = class platosfuertesController {
    platosfuertesService;
    constructor(platosfuertesService) {
        this.platosfuertesService = platosfuertesService;
    }
    async create(dto) {
        const platofuerte = await this.platosfuertesService.create(dto);
        return new response_dto_1.SuccessResponseDto('platofuerte creada exitosamente', platofuerte);
    }
    async findAll(page = 1, limit = 10, isActive) {
        if (isActive !== undefined &&
            isActive !== 'true' &&
            isActive !== 'false') {
            throw new common_1.BadRequestException('Valor inválido para "isActive". Usa "true" o "false".');
        }
        const result = await this.platosfuertesService.findAll({ page, limit }, isActive === 'true' ? true : isActive === 'false' ? false : undefined);
        if (!result)
            throw new common_1.InternalServerErrorException('No se pudieron obtener las platosfuertes');
        return new response_dto_1.SuccessResponseDto('platosfuertes obtenidas exitosamente', result);
    }
    async findOne(id) {
        const platofuerte = await this.platosfuertesService.findOne(id);
        if (!platofuerte)
            throw new common_1.NotFoundException('platofuerte no encontrada');
        return new response_dto_1.SuccessResponseDto('platofuerte obtenida exitosamente', platofuerte);
    }
    async update(id, dto) {
        const platofuerte = await this.platosfuertesService.update(id, dto);
        if (!platofuerte)
            throw new common_1.NotFoundException('platofuerte no encontrada');
        return new response_dto_1.SuccessResponseDto('platofuerte actualizada exitosamente', platofuerte);
    }
    async remove(id) {
        const platofuerte = await this.platosfuertesService.remove(id);
        if (!platofuerte)
            throw new common_1.NotFoundException('platofuerte no encontrada');
        return new response_dto_1.SuccessResponseDto('platofuerte eliminada exitosamente', platofuerte);
    }
    async uploadProfile(id, file) {
        if (!file)
            throw new common_1.BadRequestException('Se requiere una imagen de perfil');
        const platofuerte = await this.platosfuertesService.updateProfile(id, file.filename);
        if (!platofuerte)
            throw new common_1.NotFoundException('platofuerte no encontrada');
        return new response_dto_1.SuccessResponseDto('Imagen de perfil actualizada', platofuerte);
    }
};
exports.platosfuertesController = platosfuertesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_platosfuertes_1.CreatePlatoFuerteDto]),
    __metadata("design:returntype", Promise)
], platosfuertesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('isActive')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], platosfuertesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], platosfuertesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_platosfuertes_1.UpdatePlatoFuerteDto]),
    __metadata("design:returntype", Promise)
], platosfuertesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], platosfuertesController.prototype, "remove", null);
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
], platosfuertesController.prototype, "uploadProfile", null);
exports.platosfuertesController = platosfuertesController = __decorate([
    (0, common_1.Controller)('platosfuertes'),
    __metadata("design:paramtypes", [platosfuertes_service_1.platosfuertesService])
], platosfuertesController);
//# sourceMappingURL=platosfuertes.controller.js.map