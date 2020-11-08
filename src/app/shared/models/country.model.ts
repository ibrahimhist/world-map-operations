import { countryByContinent } from '../constants/country-by-continent.constant';

export class Country {
  id: string;
  name: string;
  continent: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    if (name) {
      this.continent = countryByContinent.find(
        (x) => x.country.toLowerCase() === name.toLowerCase()
      )?.continent;
    }
  }
}
