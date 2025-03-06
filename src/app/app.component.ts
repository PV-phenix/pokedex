import { Component } from '@angular/core';
import { RouterOutlet,} from '@angular/router';




@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
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


