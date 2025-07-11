import { Test, TestingModule } from '@nestjs/testing';
import { postresController } from './postres.controller';

describe('PostresController', () => {
  let controller: postresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [postresController],
    }).compile();

    controller = module.get<postresController>(postresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
