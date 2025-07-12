import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrderSchema } from './schemas/order.schema';  // Esquema de Order

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },  // Importamos el esquema de Order
    ]),
  ],
  controllers: [OrdersController],  // Controlador de Orders
  providers: [OrdersService],  // Servicio de Orders
})
export class OrdersModule {}
