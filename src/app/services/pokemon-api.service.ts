import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonApiService {
  private apiUrlPokemon = 'https://pokeapi.co/api/v2/pokemon/';
  private apiUrlAbilities = 'https://pokeapi.co/api/v2/ability/';

  constructor(private http: HttpClient) {}

  getPokemonList(offset: number, limit: number): Observable<any> {
    return this.http.get(
      this.apiUrlPokemon + '?offset=' + offset + '&limit=' + limit
    );
  }

  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(this.apiUrlPokemon + name);
  }

  getPokemonAbilities(id: number): Observable<any> {
    return this.http.get(this.apiUrlAbilities + id);
  }
}
