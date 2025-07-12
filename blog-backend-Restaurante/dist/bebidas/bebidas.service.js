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
exports.BebidasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const bebidas_entity_1 = require("./bebidas.entity");
let BebidasService = class BebidasService {
    bebidasRepository;
    constructor(bebidasRepository) {
        this.bebidasRepository = bebidasRepository;
    }
    async create(createbebidaDto) {
        const nuevaBebida = this.bebidasRepository.create(createbebidaDto);
        return await this.bebidasRepository.save(nuevaBebida);
    }
    async findAll(options, isActive) {
        const query = this.bebidasRepository.createQueryBuilder('bebida');
        if (isActive !== undefined) {
            query.where('bebida.disponibilidad = :isActive', { isActive });
        }
        return await (0, nestjs_typeorm_paginate_1.paginate)(query, options);
    }
    async findOne(id) {
        return await this.bebidasRepository.findOne({ where: { id } });
    }
    async update(id, updatebebidaDto) {
        const bebidaExistente = await this.bebidasRepository.findOne({ where: { id } });
        if (!bebidaExistente)
            return null;
        Object.assign(bebidaExistente, updatebebidaDto);
        return this.bebidasRepository.save(bebidaExistente);
    }
    async remove(id) {
        const bebida = await this.findOne(id);
        if (!bebida)
            return null;
        return await this.bebidasRepository.remove(bebida);
    }
    async updateProfile(id, filename) {
        const bebida = await this.findOne(id);
        if (!bebida)
            return null;
        bebida.profile = filename;
        return await this.bebidasRepository.save(bebida);
    }
};
exports.BebidasService = BebidasService;
exports.BebidasService = BebidasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(bebidas_entity_1.Bebidas)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BebidasService);
//# sourceMappingURL=bebidas.service.js.map