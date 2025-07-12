"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BebidasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bebidas_entity_1 = require("./bebidas.entity");
const bebidas_service_1 = require("./bebidas.service");
const bebidas_controller_1 = require("./bebidas.controller");
let BebidasModule = class BebidasModule {
};
exports.BebidasModule = BebidasModule;
exports.BebidasModule = BebidasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([bebidas_entity_1.Bebidas])],
        controllers: [bebidas_controller_1.BebidasController],
        providers: [bebidas_service_1.BebidasService],
        exports: [bebidas_service_1.BebidasService],
    })
], BebidasModule);
//# sourceMappingURL=bebidas.module.js.map