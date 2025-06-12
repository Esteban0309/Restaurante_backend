import { Test, TestingModule } from '@nestjs/testing';
import { EntradasController } from './entradas.controller';
import { beforeEach, describe, it } from 'node:test';

describe('EntradasController', () => {
  let controller: EntradasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntradasController],
    }).compile();

    controller = module.get<EntradasController>(EntradasController);
  });

  
});
