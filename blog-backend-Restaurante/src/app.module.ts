import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatoFuerteController } from './platos-fuertes/platosfuertes.controller';
import { PlatoFuerteService } from './platos-fuertes/platosfuertes.service';
import { PlatosFuertesModule } from './platos-fuertes/platosfuertes.module';
import { entradasController } from './entradas/entradas.controller';
import { EntradasService } from './entradas/entradas.service';
import { EntradasModule } from './entradas/entradas.module';
import { PostresController } from './postres/postres.controller';
import { PostresService } from './postres/postres.service';
import { PostresModule } from './postres/postres.module';
import { bebidasController } from './bebidas/bebidas.controller';
import { bebidasService } from './bebidas/bebidas.service';
import { BebidasModule } from './bebidas/bebidas.module';
import { ConfigModule } from '@nestjs/config';
import { Postre } from './postres/postres.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Postre],
      synchronize: true,
      // ssl: { rejectUnauthorized: false },
    }),
    PlatosFuertesModule,
    EntradasModule,
    PostresModule,
    BebidasModule,
  ],
  controllers: [], // Sin PlatoFuerteController
  providers: [], // Sin PlatoFuerteService
})
export class AppModule {}
