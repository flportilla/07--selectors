import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryResponse, CountrySmall } from '../interfaces/countries.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryServiceService {

  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  private _baseUrl: string = 'https://restcountries.com/v2'
  get regions(): string[] {
    return [...this._regions];
  }

  constructor(private http: HttpClient) { }

  getCountriesByRegion(region: string): Observable<CountrySmall[]> {
    const url: string = `${this._baseUrl}/region/${region}?fields=alpha3Code,name`
    return this.http.get<CountrySmall[]>(url);
  }

  getCountryByCode(code: string): Observable<CountryResponse[] | []> {

    if (!code) return of([])

    const url: string = `${this._baseUrl}/alpha?codes=${code}`
    return this.http.get<CountryResponse[]>(url)
  }
  getCountryByCodeSmall(code: string): Observable<CountrySmall> {

    const url: string = `${this._baseUrl}/alpha?codes=${code}?fields=alpha3Code,name`
    return this.http.get<CountrySmall>(url)
  }

  

}
