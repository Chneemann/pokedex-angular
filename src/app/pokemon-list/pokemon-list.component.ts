import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../services/pokemon-api.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  pokemonDetails: any[] = [];

  constructor(private pokemonApiService: PokemonApiService) {}

  ngOnInit() {
    this.getPokemonList();
  }

  getPokemonList() {
    this.pokemonApiService.getPokemonList().subscribe({
      next: (data) => {
        this.pokemonList = data.results;
        this.loadPokemonDetails();
      },
      error: (err) => console.error('Error fetching Pokémon:', err),
    });
  }

  loadPokemonDetails() {
    const requests = this.pokemonList.map((pokemon) =>
      this.pokemonApiService.getPokemonDetails(pokemon.name)
    );
    forkJoin(requests).subscribe({
      next: (details) => {
        this.pokemonDetails = details;
      },
      error: (err) => console.error('Error fetching Pokémon details:', err),
    });
  }
}
