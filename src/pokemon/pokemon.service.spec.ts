import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { PokemonService } from './pokemon.service';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let httpService: DeepMocked<HttpService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService],
    })
      .useMocker(createMock)
      .compile();

    pokemonService = module.get<PokemonService>(PokemonService);
    httpService = module.get(HttpService);
  });

  // Este test viene por defecto
  it('should be defined', () => {
    expect(pokemonService).toBeDefined();
  });

  describe('getPokemonNameById', () => {
    it('si pasamos un "id" menor que 1 deberia dar error', async () => {
      const resultResponse = pokemonService.getPokemonNameById(-1);
      await expect(resultResponse).rejects.toBeInstanceOf(BadRequestException);
    });

    it('si pasamos un "id" mayor que 150 deberia dar error', async () => {
      const resultResponse = pokemonService.getPokemonNameById(200);
      await expect(resultResponse).rejects.toBeInstanceOf(BadRequestException);
    });

    it('si pasamos un "id" valido deberia devolver un nombre de pokemon', async () => {
      httpService.axiosRef.mockResolvedValueOnce({
        data: {
          species: { name: `bulbasaur` },
        },
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      });
      const resultResponse = pokemonService.getPokemonNameById(1);
      await expect(resultResponse).resolves.toBe('bulbasaur');
    });

    it('si pasamos un "id" valido y el servicio de Pokemon devuelve empty data deberia dar error', async () => {
      httpService.axiosRef.mockResolvedValueOnce({
        data: `Unexpected data`,
        headers: {},
        config: { url: '' },
        status: 200,
        statusText: '',
      });
      const resultResponse = pokemonService.getPokemonNameById(1);
      await expect(resultResponse).rejects.toBeInstanceOf(
        InternalServerErrorException,
      );
    });
  });
});
