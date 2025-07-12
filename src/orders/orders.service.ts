import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  // Crear una orden con el nombre del ítem proporcionado en el DTO
  async create(dto: CreateOrderDto): Promise<Order | null> {
    try {
      // Directamente tomamos los ítems con el nombre ya incluido en el DTO
      const itemsWithNames = dto.items.map(item => ({
        ...item,
      }));

      const order = new this.orderModel({
        ...dto,
        items: itemsWithNames,
      });
      return await order.save();  // Retorna Order o null si ocurre un error
    } catch (err) {
      console.error('Error creating order:', err);
      return null;  // Permite que se devuelva null en caso de error
    }
  }

  // Función findAll actualizada para permitir null
  async findAll(options: { page: number; limit: number }): Promise<any | null> {
    try {
      const { page, limit } = options;
      const orders = await this.orderModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit);

      return { items: orders, page, limit };
    } catch (err) {
      console.error('Error retrieving orders:', err);
      return null;  // Permite que se devuelva null si no se encuentra el pedido
    }
  }

  // Función findOne actualizada para permitir null
  async findOne(id: string): Promise<Order | null> {
    try {
      return await this.orderModel.findById(id);  // Puede retornar Order o null
    } catch (err) {
      console.error('Error retrieving order:', err);
      return null;  // Permite que se devuelva null si no se encuentra el pedido
    }
  }
}
