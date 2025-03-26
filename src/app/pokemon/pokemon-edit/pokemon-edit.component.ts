import { Component, Type, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PokemonService } from '../../pokemon.service';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { POKEMON_RULES,Pokemon,getPokemonColor } from '../../pokemon.model';
import { toSignal } from '@angular/core/rxjs-interop';


@Component({
    selector: 'app-pokemon-edit',
    imports: [RouterLink, ReactiveFormsModule,RouterLink,JsonPipe],
    templateUrl: './pokemon-edit.component.html',
    styles: ``
})
export class PokemonEditComponent 
{
    
  constructor() {
    // Cette fonction se déclenche une seule fois à la réception de la requête HTTP.
  
    effect(() => {
      const pokemon = this.pokemon();
  
      if (pokemon) {
        // On hydrate les champs name, life et damage. (FormControl)
        
        this.form.patchValue({name: pokemon.name,
          life: pokemon.life,
          damage: pokemon.damage,
        });
  
        // On hydrate le champ type. (FormControl)
  
        pokemon.types.forEach((type) => {
          this.pokemonTypeList.push(new FormControl(type));
        });
      }
    });
  }
  
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly pokemonService = inject(PokemonService);
  readonly pokemonId = Number(this.route.snapshot.paramMap.get('id'));
  // readonly pokemon = signal(this.pokemonService.getPokemonById(this.pokemonId)).asReadonly();
  readonly pokemon = toSignal(this.pokemonService.getPokemonById(this.pokemonId));
  readonly POKEMON_RULES = signal(POKEMON_RULES);

 
  // readonly form = new FormGroup({
  //   name: new FormControl(this.pokemon().name,[
  //     Validators.required,
  //     Validators.minLength(POKEMON_RULES.MIN_NAME),
  //     Validators.maxLength(POKEMON_RULES.MAX_NAME),
  //     Validators.pattern(POKEMON_RULES.NAME_PATTERN)
  //   ]),
  //   life: new FormControl(this.pokemon().life),
  //   damage: new FormControl(this.pokemon().damage),
  //   types: new FormArray
  //   (
  //       this.pokemon().types.map((type) => new FormControl(type)), 
  //       [Validators.required,
  //       Validators.maxLength(POKEMON_RULES.MAX_TYPES)]
  //   )
  // });

  readonly form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(POKEMON_RULES.MIN_NAME),
      Validators.maxLength(POKEMON_RULES.MAX_NAME),
      Validators.pattern(POKEMON_RULES.NAME_PATTERN),
    ]),
    life: new FormControl(),
    damage: new FormControl(),
    types: new FormArray([], [Validators.required, Validators.maxLength(3)]),
  });





get pokemonTypeList(){return this.form.get('types') as FormArray;}

isPokemonTypeSelected(type:string):boolean{return !!this.pokemonTypeList.controls.find((control) =>control.value===type);}

onPokemonTypechange(type:string,isChecked:boolean):void{
  if (isChecked){
    const control = new FormControl(type);
    this.pokemonTypeList.push(control);
  }
  else{
    const index = this.pokemonTypeList.controls
    .map((control)=>control.value)
    .indexOf(type);
    this.pokemonTypeList.removeAt(index);
    }
}

onSubmit() {
  const isFormValid = this.form.valid;
  const pokemon = this.pokemon();

  if (isFormValid && pokemon) {
    const updatedPokemon: Pokemon = {
      ...pokemon,
      name: this.pokemonName.value as string,
      life: this.pokemonLife.value,
      damage: this.pokemonDamage.value,
      types: this.pokemonTypeList.value,
    };

    this.pokemonService.updatePokemon(updatedPokemon).subscribe(() => {
      this.router.navigate(['/pokemons', this.pokemonId]);
    });
  }
}

getPokemonColor (type:string){
  return getPokemonColor(type);
}
get pokemonName(){return this.form.get('name') as FormControl;}

get pokemonLife(){return this.form.get('life') as FormControl;}


incrementLife() {
  const newValue = this.pokemonLife.value + 1;
  this.pokemonLife.setValue(newValue);

}

decrementLife() {
  const newValue = this.pokemonLife.value - 1;
  this.pokemonLife.setValue(newValue);
}

get pokemonDamage(){
  return this.form.get('damage') as FormControl;
}

incrementDamage(){
  const newValue = this.pokemonDamage.value + 1;
  this.pokemonDamage.setValue(newValue);
}

decrementDamage(){
  const newValue = this.pokemonDamage.value - 1;
  this.pokemonDamage.setValue(newValue);
}

reset() {
  this.pokemonLife.setValue(0);
}

}