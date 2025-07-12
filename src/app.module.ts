import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlatosFuertesModule } from './platos-fuertes/platosfuertes.module';
import { EntradasModule } from './entradas/entradas.module';
import { PostresModule } from './postres/postres.module';
import { BebidasModule } from './bebidas/bebidas.module';
import { ConfigModule } from '@nestjs/config';
import { Postre } from './postres/postres.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PlatoFuerte } from './platos-fuertes/platosfuertes.entity';
import { Bebidas } from './bebidas/bebidas.entity';
import { Entradas } from './entradas/entradas.entity';
import { PaymentsModule } from './payments/payments.module';
import { OrdersModule } from './orders/orders.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [PlatoFuerte, Postre, Bebidas, Entradas],
      synchronize: true,
      ssl: { rejectUnauthorized: false },
    }),
    PlatosFuertesModule,
    EntradasModule,
    PostresModule,
    BebidasModule,
    PaymentsModule,
    OrdersModule,
  ],
  controllers: [AppController], // Sin PlatoFuerteController
  providers: [], // Sin PlatoFuerteService
})
export class AppModule {}
