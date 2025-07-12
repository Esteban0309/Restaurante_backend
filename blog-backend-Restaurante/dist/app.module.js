"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const platosfuertes_module_1 = require("./platos-fuertes/platosfuertes.module");
const entradas_module_1 = require("./entradas/entradas.module");
const postres_module_1 = require("./postres/postres.module");
const bebidas_module_1 = require("./bebidas/bebidas.module");
const config_1 = require("@nestjs/config");
const postres_entity_1 = require("./postres/postres.entity");
const mongoose_1 = require("@nestjs/mongoose");
const platosfuertes_entity_1 = require("./platos-fuertes/platosfuertes.entity");
const bebidas_entity_1 = require("./bebidas/bebidas.entity");
const entradas_entity_1 = require("./entradas/entradas.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            mongoose_1.MongooseModule.forRoot(process.env.MONGO_URI || ''),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: parseInt(process.env.DB_PORT || '5432', 10),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                entities: [platosfuertes_entity_1.PlatoFuerte, postres_entity_1.Postre, bebidas_entity_1.Bebidas, entradas_entity_1.Entradas],
                synchronize: true,
            }),
            platosfuertes_module_1.PlatosFuertesModule,
            entradas_module_1.EntradasModule,
            postres_module_1.PostresModule,
            bebidas_module_1.BebidasModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map