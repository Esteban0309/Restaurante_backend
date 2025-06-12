import { Test, TestingModule } from '@nestjs/testing';
import { PlatoFuerteService } from './platosfuertes.service';

describe('PlatosFuertesService', () => {
  let service: PlatoFuerteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlatoFuerteService],
    }).compile();

    service = module.get<PlatoFuerteService>(PlatoFuerteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
