import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute,RouterLink,RouterState,Router } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { DatePipe } from '@angular/common';  // 👈
import { Observable, catchError, map, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
    selector: 'app-pokemon-profile',
    imports: [RouterLink, DatePipe],
    templateUrl: './pokemon-profile.component.html',
    styles: ``
})
export class PokemonProfileComponent {
  constructor(router:Router){
    const state:RouterState=router.routerState;
    const root:ActivatedRoute=state.root;
    const child =root.firstChild;
    const id:Observable<string> = child?child.params.pipe(map(p=>p['id'])):of(null);

  }
  
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  //readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId));
  //readonly pokemon = toSignal(this.pokemonService.getPokemonById(this.pokemonId));
  readonly pokemonList = toSignal(this.pokemonService.getPokemonList(),{initialValue:[]});
  // Notre nouveau Signal avec la réponse HTTP "brute".

  private readonly pokemonResponse = toSignal(this.pokemonService.getPokemonById(this.pokemonId).pipe(map((value) => ({ value, error: undefined })),
      catchError((error) => of({ value: undefined, error }))
    )
  );

  // En attente de la réponse HTTP

  readonly loading = computed(() => !this.pokemonResponse());

  // Cas d'erreur HTTP

  readonly error = computed(() => this.pokemonResponse()?.error);

  // Cas de succès HTTP

  readonly pokemon = computed(() => this.pokemonResponse()?.value);
  

  deletePokemon(pokemonId: number) {
    this.pokemonService.deletePokemon(pokemonId).subscribe(() => {
      this.router.navigate(['/pokemons']);
    });
  }
}

