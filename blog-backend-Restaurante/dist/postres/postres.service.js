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
exports.PostresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const postres_entity_1 = require("./postres.entity");
let PostresService = class PostresService {
    postreRepository;
    constructor(postreRepository) {
        this.postreRepository = postreRepository;
    }
    async create(dto) {
        try {
            const nuevoPostre = this.postreRepository.create(dto);
            return await this.postreRepository.save(nuevoPostre);
        }
        catch (err) {
            console.error('Error al crear postre:', err);
            return null;
        }
    }
    async findAll(options, isActive) {
        try {
            const query = this.postreRepository.createQueryBuilder('postre');
            if (isActive !== undefined) {
                query.where('postre.disponibilidad = :isActive', { isActive });
            }
            return await (0, nestjs_typeorm_paginate_1.paginate)(query, options);
        }
        catch (err) {
            console.error('Error al listar postres:', err);
            return null;
        }
    }
    async findOne(id) {
        try {
            return await this.postreRepository.findOne({ where: { id: Number(id) } });
        }
        catch (err) {
            console.error('Error al buscar postre:', err);
            return null;
        }
    }
    async findByNombre(nombre) {
        try {
            return await this.postreRepository.findOne({ where: { nombre } });
        }
        catch (err) {
            console.error('Error al buscar por nombre:', err);
            return null;
        }
    }
    async update(id, dto) {
        try {
            const postre = await this.findOne(id);
            if (!postre)
                return null;
            Object.assign(postre, dto);
            return await this.postreRepository.save(postre);
        }
        catch (err) {
            console.error('Error al actualizar postre:', err);
            return null;
        }
    }
    async remove(id) {
        try {
            const postre = await this.findOne(id);
            if (!postre)
                return null;
            return await this.postreRepository.remove(postre);
        }
        catch (err) {
            console.error('Error al eliminar postre:', err);
            return null;
        }
    }
    async updateProfile(id, filename) {
        try {
            const postre = await this.findOne(id);
            if (!postre)
                return null;
            postre.profile = filename;
            return await this.postreRepository.save(postre);
        }
        catch (err) {
            console.error('Error al actualizar imagen de postre:', err);
            return null;
        }
    }
};
exports.PostresService = PostresService;
exports.PostresService = PostresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(postres_entity_1.Postre)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostresService);
//# sourceMappingURL=postres.service.js.map