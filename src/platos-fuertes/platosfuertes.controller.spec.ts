import { Test, TestingModule } from '@nestjs/testing';
import { platosfuertesController } from './platosfuertes.controller';

describe('PlatosFuertesController', () => {
  let controller: platosfuertesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [platosfuertesController],
    }).compile();

    controller = module.get<platosfuertesController>(platosfuertesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
