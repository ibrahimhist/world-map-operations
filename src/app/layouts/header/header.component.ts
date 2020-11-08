import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { countriesGeo } from 'src/app/shared/constants/countries.geo';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Country } from 'src/app/shared/models/country.model';
import { WorldMapOperationsService } from 'src/app/shared/services/world-map-operations.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  user: User;

  isLoggedInSubs: Subscription;
  typeHeadCountryFilterSubs: Subscription;

  selectedCountry: any;
  countries: Country[];
  filteredCountries: Country[] = [];
  typeHeadCountryFilter: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    private authService: AuthService,
    private worldMapOperationsService: WorldMapOperationsService
  ) {
    this.countries = this.worldMapOperationsService.getCountries();
  }

  ngOnInit(): void {
    this.isLoggedInSubs = this.authService.isLoggedIn.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
        if (this.isLoggedIn) {
          this.user = this.authService.getUser();
        }
      }
    );

    this.typeHeadCountryFilterSubs = this.typeHeadCountryFilter
      .pipe(distinctUntilChanged(), debounceTime(600))
      .subscribe((filterValue) => {
        const filtered: any[] = [];

        if (filterValue && filterValue.length > 2) {
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            if (
              country.name.toLowerCase().indexOf(filterValue.toLowerCase()) !==
              -1
            ) {
              filtered.push(country);
            }
          }
        }

        this.filteredCountries = filtered;
      });
  }

  onChangeCountry(): void {
    // console.log(this.selectedCountry);
  }

  filterCountry(event): void {
    const query = event.query;
    this.typeHeadCountryFilter.emit(query);
  }

  signOut(): void {
    this.authService.signOut();
  }

  ngOnDestroy(): void {
    if (this.isLoggedInSubs) {
      this.isLoggedInSubs.unsubscribe();
    }

    if (this.typeHeadCountryFilterSubs) {
      this.typeHeadCountryFilterSubs.unsubscribe();
    }
  }
}
