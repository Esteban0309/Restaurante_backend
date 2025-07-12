import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true, enum: ['pending', 'completed', 'canceled'], default: 'pending' })
  status: string;

  @Prop({
    type: [
      {
        menuItem: { type: Types.ObjectId, ref: 'MenuItem', required: true },  // Referencia a MenuItem
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
      }
    ],
    required: true
  })
  items: {
    menuItem: Types.ObjectId;
    name: string;
    quantity: number;
    price: number;
  }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
