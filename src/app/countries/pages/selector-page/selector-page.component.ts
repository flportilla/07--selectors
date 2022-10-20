import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryServiceService } from '../../services/country-service.service';
import { CountrySmall } from '../../interfaces/countries.interface';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  myForm: FormGroup = this.fb.group({
    region: ['', [Validators.required]],
    country: ['', [Validators.required]],
    border: ['', [Validators.required]],
  })

  //fill selectors
  regions: string[] = []
  countries: CountrySmall[] = []
  borders: string[] | null = []

  //loading UI
  loading: boolean = false

  constructor(
    private fb: FormBuilder,
    private countryService: CountryServiceService
  ) { }

  ngOnInit(): void {

    this.regions = this.countryService.regions

    //on region change
    this.myForm.get('region')?.valueChanges
      .pipe(
        tap(() => {
          this.myForm.get('country')?.reset('')
          this.loading = true
        }),
        switchMap(region => this.countryService.getCountriesByRegion(region))
      )
      .subscribe(countries => {
        this.countries = countries
        this.loading = false
      })

    //on country change
    this.myForm.get('country')?.valueChanges
      .pipe(
        tap(() => {
          this.myForm.get('border')?.reset('')
          this.loading = true
        }),
        switchMap(code => this.countryService.getCountryByCode(code))
      )
      .subscribe(country => {
          this.borders = country[0]?.borders || []
          this.loading = false

      })
  }

  save() {
    console.log(this.myForm.value);
  }

}
