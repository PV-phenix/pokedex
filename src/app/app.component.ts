import { Component } from '@angular/core';
import { RouterOutlet,RouterLink } from '@angular/router';

import {PokemonBorderDirective} from './pokemon-border.directive'
import { DatePipe, UpperCasePipe } from '@angular/common'; 
import { ReversePipe } from './reverse.pipe'; 

import { PokemonListComponent} from './pokemon/pokemon-list/pokemon-list.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title='Pokedex';
  // name = signal('Pikachu');
  // imageSrc = signal('images/pikachu.png');
  // life =signal(21);
  // taille=computed(()=>this.life()<=15?"petit":this.life()>=25?"grand":"moyen");

 
}


