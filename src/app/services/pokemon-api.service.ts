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

  /**
   * Retrieves a list of Pokemon based on the provided offset and limit.
   * @param offset The starting index of the list.
   * @param limit The maximum number of Pokemon to retrieve.
   * @returns An Observable containing the list of Pokemon.
   */
  getPokemonList(offset: number, limit: number): Observable<any> {
    return this.http.get(
      this.apiUrlPokemon + '?offset=' + offset + '&limit=' + limit
    );
  }

  /**
   * Retrieves the details of a Pokemon given its name.
   * @param name The name of the Pokemon.
   * @returns An Observable containing the Pokemon details.
   */
  getPokemonDetails(name: string): Observable<any> {
    return this.http.get(this.apiUrlPokemon + name);
  }

  /**
   * Retrieves the details of a Pokemon ability given its id.
   * @param id The id of the Pokemon ability.
   * @returns An Observable containing the Pokemon ability details.
   */
  getPokemonAbilities(id: number): Observable<any> {
    return this.http.get(this.apiUrlAbilities + id);
  }
}
