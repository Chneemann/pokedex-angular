import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonApiService } from '../../../services/pokemon-api.service';
import { PokemonStatsComponent } from './pokemon-stats/pokemon-stats.component';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule, PokemonStatsComponent],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemonName: string = '';
  @Output() cardClosed = new EventEmitter<string>();

  pokemonDetails: any[] = [];

  constructor(private pokemonApiService: PokemonApiService) {}

  ngOnInit() {
    this.loadPokemonDetails();
  }

  loadPokemonDetails() {
    this.pokemonApiService
      .getPokemonDetails(this.pokemonName)
      .subscribe((data) => {
        this.pokemonDetails.push(data);
      });
  }

  closePokemonCard() {
    this.pokemonName = '';
    this.cardClosed.emit(this.pokemonName);
  }

  stopPropagation(event: any) {
    event.stopPropagation();
  }
}
