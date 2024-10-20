import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonApiService } from '../../../services/pokemon-api.service';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss'],
})
export class PokemonCardComponent implements OnInit {
  @Input() pokemonName: string = '';
  @Output() cardClosed = new EventEmitter<string>();

  pokemonDetails: any[] = [];
  pokemonAbility: any[] = [];
  openStats: string = 'base-stats';

  constructor(private pokemonApiService: PokemonApiService) {}

  ngOnInit() {
    this.loadPokemonDetails();
  }

  loadPokemonDetails() {
    this.pokemonApiService
      .getPokemonDetails(this.pokemonName)
      .subscribe((data) => {
        this.pokemonDetails.push(data);
        this.loadAbilities(data.abilities);
      });
  }

  loadPokemonAbility(id: number) {
    this.pokemonApiService.getPokemonAbilities(id).subscribe((data) => {
      this.pokemonAbility.push(data);
    });
  }

  loadAbilities(abilities: any[]) {
    abilities.forEach((ability) => {
      const abilityId = this.getIdFromUrl(ability.ability.url);
      if (abilityId) {
        this.loadPokemonAbility(+abilityId);
      }
    });
  }

  getIdFromUrl(url: string): string {
    const regex = /\/(\d+)\//;
    const match = url.match(regex);
    return match![1];
  }

  searchAbilityId(id: number) {
    return this.pokemonAbility.find((ability) => ability.id === id);
  }

  getAbilityEffect(currentAbility: any): string {
    const effectEntries = currentAbility.effect_entries;
    const englishEntry = effectEntries.find(
      (entry: any) => entry.language.name === 'en'
    );
    if (englishEntry) {
      return englishEntry.short_effect;
    }
    return effectEntries.length > 0
      ? effectEntries[0].short_effect
      : 'No description available.';
  }

  closePokemonCard() {
    this.pokemonName = '';
    this.cardClosed.emit(this.pokemonName);
  }

  stopPropagation(event: any) {
    event.stopPropagation();
  }

  loadStats(data: string) {
    this.openStats = data;
  }
}
