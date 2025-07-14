import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VinosService } from './vino.service';
import { VinosController } from './vino.controller';
import { Vino, VinoSchema } from './schemas/vino.schema';
import { Counter, CounterSchema } from '../common/counter.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vino.name, schema: VinoSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  controllers: [VinosController],
  providers: [VinosService],
})
export class VinosModule {}
