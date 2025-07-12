import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './schemas/payment.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(@InjectModel('Payment') private readonly paymentModel: Model<Payment>) {}

  async create(dto: CreatePaymentDto): Promise<Payment | null> {
    try {
      const payment = new this.paymentModel(dto);
      return await payment.save();  // Retorna Payment o null si ocurre un error
    } catch (err) {
      console.error('Error creating payment:', err);
      return null;  // Permite que se devuelva null en caso de error
    }
  }


  async findAll(options: { page: number; limit: number }): Promise<any> {
    try {
      const { page, limit } = options;
      const payments = await this.paymentModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('orderId');
      return { items: payments, page, limit };
    } catch (err) {
      console.error('Error retrieving payments:', err);
      return null;
    }
  }

  async findOne(id: string): Promise<Payment | null> {
    try {
      return await this.paymentModel.findById(id).populate('orderId');
    } catch (err) {
      console.error('Error retrieving payment:', err);
      return null;
    }
  }
}
