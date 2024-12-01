import { WritableSignal,Signal } from "@angular/core";


export interface Pokemon {
    id: number;
    name: string;
    picture: string;
    life:number;
    taille:number,
    damage: number;
    types: [string, string?, string?];
    created: Date;
}
export type PokemonList = Pokemon[];