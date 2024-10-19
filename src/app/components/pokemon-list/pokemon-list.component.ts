import { Component, OnInit } from '@angular/core';
import { PokemonApiService } from '../../services/pokemon-api.service';
import { forkJoin } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemonList: any[] = [];
  pokemonDetails: any[] = [];
  filteredPokemon: any[] = [];
  total: number = 640;
  limit: number = 20;
  offset: number = 0;
  searchValue: string = '';

  constructor(private pokemonApiService: PokemonApiService) {}

  ngOnInit() {
    this.getPokemonList();
  }

  getPokemonList() {
    this.pokemonApiService.getPokemonList(this.offset, this.limit).subscribe({
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
        this.pokemonDetails.push(...details);
        this.filteredPokemon = this.pokemonDetails;
      },
      error: (err) => console.error('Error fetching Pokémon details:', err),
    });
  }

  onValueChanged(value: string) {
    this.searchValue = value;
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
    if (this.offset + this.limit < this.total) {
      this.offset += this.limit;
      this.getPokemonList();
    }
  }
}
