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
exports.platosfuertesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const platosfuertes_entity_1 = require("./platosfuertes.entity");
let platosfuertesService = class platosfuertesService {
    platosfuertesRepository;
    constructor(platosfuertesRepository) {
        this.platosfuertesRepository = platosfuertesRepository;
    }
    async create(dto) {
        const nuevaplatosfuertes = this.platosfuertesRepository.create(dto);
        return this.platosfuertesRepository.save(nuevaplatosfuertes);
    }
    async findAll(options, isActive) {
        const query = this.platosfuertesRepository.createQueryBuilder('platosfuertes');
        if (isActive !== undefined) {
            query.where('platosfuertes.disponibilidad = :isActive', { isActive });
        }
        return (0, nestjs_typeorm_paginate_1.paginate)(query, options);
    }
    async findOne(id) {
        return this.platosfuertesRepository.findOne({ where: { id } });
    }
    async update(id, dto) {
        const platosfuertes = await this.platosfuertesRepository.findOne({ where: { id } });
        if (!platosfuertes)
            return null;
        Object.assign(platosfuertes, dto);
        return this.platosfuertesRepository.save(platosfuertes);
    }
    async remove(id) {
        const platosfuertes = await this.findOne(id);
        if (!platosfuertes)
            return null;
        return this.platosfuertesRepository.remove(platosfuertes);
    }
    async updateProfile(id, filename) {
        const platosfuertes = await this.findOne(id);
        if (!platosfuertes)
            return null;
        platosfuertes.profile = filename;
        return this.platosfuertesRepository.save(platosfuertes);
    }
};
exports.platosfuertesService = platosfuertesService;
exports.platosfuertesService = platosfuertesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(platosfuertes_entity_1.PlatoFuerte)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], platosfuertesService);
//# sourceMappingURL=platosfuertes.service.js.map