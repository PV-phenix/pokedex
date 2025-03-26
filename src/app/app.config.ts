import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';

import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component'; // 
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PokemonEditComponent } from './pokemon/pokemon-edit/pokemon-edit.component'

import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

// 👇
const routes: Routes = [
  { path: 'pokemons/edit/:id', component: PokemonEditComponent, title: 'Pokémon'},
  { path: 'pokemons/:id', component: PokemonProfileComponent, title: 'Pokédex'},//titre de la page ou de l'onglet
  { path: 'pokemons', component: PokemonListComponent,title: 'Pokemons' },//titre de la page ou de l'onglet
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent,title: 'Non trouvé'}
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(),provideHttpClient(withFetch())]
};
