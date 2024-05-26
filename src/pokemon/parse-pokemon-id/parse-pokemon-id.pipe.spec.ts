import { BadRequestException } from '@nestjs/common';

import { ParsePokemonIdPipe } from './parse-pokemon-id.pipe';

describe('ParsePokemonIdPipe', () => {
  let pipe: ParsePokemonIdPipe;

  beforeEach(() => {
    pipe = new ParsePokemonIdPipe();
  });

  it('deberia estar definido', () => {
    expect(new ParsePokemonIdPipe()).toBeDefined();
  });

  it('deberia devolver error si le pasamos un "string"', () => {
    const value = () => pipe.transform('hola');
    expect(value).toThrow(BadRequestException);
  });

  it('deberia devolver error si le pasamos un valor menor que 1', () => {
    const value = () => pipe.transform('0');
    expect(value).toThrow(BadRequestException);
  });

  it('deberia devolver error si le pasamos un valor mayor que 151', () => {
    const value = () => pipe.transform('152');
    expect(value).toThrow(BadRequestException);
  });

  it('deberia devolver un numero si le pasamos un valor valido', () => {
    const value = () => pipe.transform('1');
    expect(value()).toBe(1);
  });
});
