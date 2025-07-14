import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VinoDocument = Vino & Document;

@Schema()
export class Vino {
  @Prop({ required: true, unique: true }) // este será nuestro id incremental
  id: number;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: false, default: null })
  precioCopa: number;
  
  @Prop({ required: false, default: null })
  precioBotella: number;

  @Prop({ required: true })
  tipo: string;

  @Prop({ required: false }) // o simplemente: @Prop()
  descripcion?: string;


  @Prop()
  Porciones?: string;

  @Prop({ default: true })
  disponibilidad: boolean;

  @Prop()
  profile?: string;
}

export const VinoSchema = SchemaFactory.createForClass(Vino);
