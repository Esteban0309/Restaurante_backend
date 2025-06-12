import { Test, TestingModule } from '@nestjs/testing';
import { EntradasService } from './entradas.service';
import { beforeEach, describe } from 'node:test';

describe('EntradasService', () => {
  let service: EntradasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntradasService],
    }).compile();

    service = module.get<EntradasService>(EntradasService);
  });

  
});
