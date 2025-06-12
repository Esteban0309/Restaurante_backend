import { Test, TestingModule } from '@nestjs/testing';
import { PlatosFuertesController } from './platos-fuertes.controller';

describe('PlatosFuertesController', () => {
  let controller: PlatosFuertesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlatosFuertesController],
    }).compile();

    controller = module.get<PlatosFuertesController>(PlatosFuertesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
