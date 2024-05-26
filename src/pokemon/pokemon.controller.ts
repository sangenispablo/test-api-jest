import { Controller, Get, Param } from '@nestjs/common';

import { PokemonService } from './pokemon.service';
import { ParsePokemonIdPipe } from './parse-pokemon-id/parse-pokemon-id.pipe';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get(':id')
  findOne(@Param('id', ParsePokemonIdPipe) id: number) {
    return this.pokemonService.getPokemonNameById(id);
  }
}
