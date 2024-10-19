import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../services/pokemon-api.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];

  constructor(private pokemonApiService: PokemonApiService) {}

  ngOnInit() {
    this.pokemonApiService.getPokemonList().subscribe({
      next: (data) => (this.pokemonList = data.results),
      error: (err) => console.error('Error fetching Pokémon:', err),
    });
  }

  getPokemon(name: string) {
    this.pokemonApiService.getPokemon(name).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.error('Error fetching Pokémon:', err),
    });
  }
}
