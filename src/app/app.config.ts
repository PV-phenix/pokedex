import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';

import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component'; // 
import { PokemonProfileComponent } from './pokemon/pokemon-profile/pokemon-profile.component';

import { provideClientHydration } from '@angular/platform-browser';

// 👇
const routes: Routes = [
  { path: 'pokemons/:id', component: PokemonProfileComponent, title: 'Pokédex'},//titre de la page ou de l'onglet
  { path: 'pokemons', component: PokemonListComponent,title: 'Pokemons' },//titre de la page ou de l'onglet
  { path: '', redirectTo: '/pokemons', pathMatch: 'full' },
];

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()]
};
