import { Test, TestingModule } from '@nestjs/testing';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';
import { ParsePokemonIdPipe } from './parse-pokemon-id/parse-pokemon-id.pipe';

describe('PokemonController', () => {
  let controller: PokemonController;
  let service: PokemonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [
        PokemonService,
        {
          provide: PokemonService,
          useValue: {
            getPokemonNameById: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('deberia devolver un "name" de un pokemon', async () => {
      const result = 'bulbasaur';
      const id = 1;
      jest.spyOn(service, 'getPokemonNameById').mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
    });

    it('deberia ejecutar correctamente el ParsePokemonIdPipe', async () => {
      const result = 'bulbasaur';
      const id = 1;
      const parsePokemonIdPipe = new ParsePokemonIdPipe();
      const transformId = parsePokemonIdPipe.transform('1');
      jest.spyOn(service, 'getPokemonNameById').mockResolvedValue(result);

      expect(await controller.findOne(id)).toBe(result);
      expect(service.getPokemonNameById).toHaveBeenCalledWith(transformId);
    });
  });
});
