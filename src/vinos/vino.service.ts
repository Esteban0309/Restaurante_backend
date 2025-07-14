import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vino, VinoDocument } from './schemas/vino.schema';
import { CreateVinoDto } from './dto/create-vino.dto';
import { Counter, CounterDocument } from '../common/counter.schema';

@Injectable()
export class VinosService {
  constructor(
    @InjectModel(Vino.name) private vinoModel: Model<VinoDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>,
  ) { }

  private async getNextId(sequenceName: string): Promise<number> {
    const counter = await this.counterModel.findOneAndUpdate(
      { name: sequenceName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true } // crea si no existe
    );
    return counter.seq;
  }

  async create(dto: CreateVinoDto): Promise<Vino> {
    try {
      const id = await this.getNextId('vino');
      const vino = new this.vinoModel({ ...dto, id });
      return await vino.save();
    } catch (error) {
      console.error('🔥 Error al crear vino:', error); // <-- Esto mostrará el error en consola
      throw error;
    }
  }


  async findAll(): Promise<Vino[]> {
    return this.vinoModel.find().sort({ id: 1 }).exec();
  }
}
