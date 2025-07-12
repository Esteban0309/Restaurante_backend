"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatosFuertesModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const platosfuertes_entity_1 = require("./platosfuertes.entity");
const platosfuertes_service_1 = require("./platosfuertes.service");
const platosfuertes_controller_1 = require("./platosfuertes.controller");
let PlatosFuertesModule = class PlatosFuertesModule {
};
exports.PlatosFuertesModule = PlatosFuertesModule;
exports.PlatosFuertesModule = PlatosFuertesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([platosfuertes_entity_1.PlatoFuerte])],
        providers: [platosfuertes_service_1.platosfuertesService],
        controllers: [platosfuertes_controller_1.platosfuertesController],
        exports: [platosfuertes_service_1.platosfuertesService],
    })
], PlatosFuertesModule);
//# sourceMappingURL=platosfuertes.module.js.map