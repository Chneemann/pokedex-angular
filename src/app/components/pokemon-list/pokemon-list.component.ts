import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  pokemonDetails: any[] = [];
  filteredPokemon: any[] = [];
  limitPokemon: number = 20;

  constructor(private pokemonApiService: PokemonApiService) {}

  ngOnInit() {
    this.getPokemonList();
  }

  getPokemonList() {
    this.pokemonApiService.getPokemonList(this.limitPokemon).subscribe({
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
        this.filteredPokemon = details;
      },
      error: (err) => console.error('Error fetching Pokémon details:', err),
    });
  }

  onValueChanged(value: string) {
    this.searchPokemon(value);
  }

  searchPokemon(searchTerm: string) {
    if (searchTerm) {
      this.filteredPokemon = this.pokemonDetails.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredPokemon = this.pokemonDetails;
    }
  }

  loadMorePokemon() {
    if (this.limitPokemon === 140) {
      this.limitPokemon += 11;
    } else {
      this.limitPokemon += 20;
    }
    this.getPokemonList();
  }
}
