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
exports.EntradasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const entradas_entity_1 = require("./entradas.entity");
let EntradasService = class EntradasService {
    entradaRepository;
    constructor(entradaRepository) {
        this.entradaRepository = entradaRepository;
    }
    async create(dto) {
        const nuevaEntrada = this.entradaRepository.create(dto);
        return this.entradaRepository.save(nuevaEntrada);
    }
    async findAll(options, isActive) {
        const query = this.entradaRepository.createQueryBuilder('entrada');
        if (isActive !== undefined) {
            query.where('entrada.disponibilidad = :isActive', { isActive });
        }
        return (0, nestjs_typeorm_paginate_1.paginate)(query, options);
    }
    async findOne(id) {
        return this.entradaRepository.findOne({ where: { id } });
    }
    async update(id, dto) {
        const entrada = await this.entradaRepository.findOne({ where: { id } });
        if (!entrada)
            return null;
        Object.assign(entrada, dto);
        return this.entradaRepository.save(entrada);
    }
    async remove(id) {
        const entrada = await this.findOne(id);
        if (!entrada)
            return null;
        return this.entradaRepository.remove(entrada);
    }
    async updateProfile(id, filename) {
        const entrada = await this.findOne(id);
        if (!entrada)
            return null;
        entrada.profile = filename;
        return this.entradaRepository.save(entrada);
    }
};
exports.EntradasService = EntradasService;
exports.EntradasService = EntradasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(entradas_entity_1.Entradas)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EntradasService);
//# sourceMappingURL=entradas.service.js.map