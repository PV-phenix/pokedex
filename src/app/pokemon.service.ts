import { Injectable,inject } from '@angular/core';
import { Pokemon, PokemonList } from './pokemon.model';
import { POKEMON_LIST } from './pokemon-list.fake';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly http = inject(HttpClient);
  private readonly POKEMON_API_URL = 'http://localhost:3000/pokemons';
  
  constructor() { }

 

  getPokemonList(): Observable<PokemonList> {
    if (!Observable<PokemonList>)
    {throw new Error(`Aucun Pokémon`);}
     return  this.http.get<PokemonList>(this.POKEMON_API_URL) ;
    
  }

  // getPokemonById(id: number):Pokemon {
  //  const pokemon = POKEMON_LIST.find((pokemon) => pokemon.id === id);
  //   if (!pokemon) {
  //     throw new Error(`Aucun Pokémon avec cet id ${id}`);}
  //     return pokemon ;
  //   } 

    // Retourne la liste des types valides pour un pokémon.

    // Retourne le pokémon avec l'identifiant passé en paramètre.
    getPokemonById(id: number): Observable<Pokemon> {
      return this.http.get<Pokemon>(`${this.POKEMON_API_URL}/${id}`);
    }

    getPokemonTypeList(): string[] {
      return [
        'Plante',
        'Feu',
        'Eau',
        'Insecte',
        'Normal',
        'Electrik',
        'Poison',
        'Fée',
        'Vol',
      ];
    }
    // Met à jour un pokémon existant.
    updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
      return this.http.put<Pokemon>(`${this.POKEMON_API_URL}/${pokemon.id}`, pokemon);
}
// Supprime un pokémon.
deletePokemon(pokemonId: number): Observable<void> {
  return this.http.delete<void>(`${this.POKEMON_API_URL}/${pokemonId}`);
}

// Ajoute un pokémon.
addPokemon(pokemon: Omit<Pokemon, 'id'>): Observable<Pokemon> {
  return this.http.post<Pokemon>(this.POKEMON_API_URL, pokemon);
}
}
