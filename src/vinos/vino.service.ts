import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vino, VinoDocument } from './schemas/vino.schema';
import { CreateVinoDto } from './dto/create-vino.dto';
import { Counter, CounterDocument } from '../common/counter.schema';
import { UpdateVinoDto } from './dto/update-vino.dto';

@Injectable()
export class VinosService {
  constructor(
    @InjectModel(Vino.name) private readonly vinoModel: Model<VinoDocument>,
    @InjectModel(Counter.name) private readonly counterModel: Model<CounterDocument>,
  ) {}
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

  async update(id: string, updateVinoDto: UpdateVinoDto): Promise<Vino> {
    try {
      const updatedVino = await this.vinoModel.findOneAndUpdate(
        { id: +id },           // Convertimos id a número, ya que usas id numérico
        updateVinoDto,
        { new: true }          // Para que devuelva el documento actualizado
      ).exec();

      if (!updatedVino) {
        throw new Error(`Vino con id ${id} no encontrado`);
      }

      return updatedVino;
    } catch (error) {
      console.error('🔥 Error al actualizar vino:', error);
      throw error;
    }
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    try {
      const result = await this.vinoModel.deleteOne({ id: +id }).exec();

      if (result.deletedCount === 0) {
        throw new Error(`No se encontró ningún vino con id ${id}`);
      }

      return { deleted: true };
    } catch (error) {
      console.error('🔥 Error al eliminar vino:', error);
      throw error;
    }
  }
}
