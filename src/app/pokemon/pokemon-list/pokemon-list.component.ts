import { Component,signal,inject,computed } from '@angular/core';
import { Pokemon } from '../../pokemon.model';
import { PokemonService } from '../../pokemon.service'; 
import { DatePipe, UpperCasePipe } from '@angular/common'; 
import { PokemonBorderDirective} from '../../pokemon-border.directive'
import { RouterLink } from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-pokemon-list',
    imports: [PokemonBorderDirective, DatePipe, UpperCasePipe, RouterLink],
    templateUrl: './pokemon-list.component.html',
    styles: ``
})
export class PokemonListComponent {
  private readonly pokemonService = inject(PokemonService);
  readonly searchTerm = signal('');
  
  readonly pokemonList = toSignal(this.pokemonService.getPokemonList(),{initialValue:[]});


  readonly pokemonListFiltered = computed(() => {
    return this.pokemonList().filter((pokemon) =>
      pokemon.name
        .toLowerCase()
        .includes(this.searchTerm().trim().toLowerCase())
    );  });
  taille(pokemon: Pokemon) {
    if (pokemon.life <= 15) {
      return 'Petit';
    }
    if (pokemon.life >= 25) {
      return 'Grand';
    }
  
    return 'Moyen';
  }
    




}
