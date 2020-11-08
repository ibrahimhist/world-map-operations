import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-continents-card',
  templateUrl: './continents-card.component.html',
  styleUrls: ['./continents-card.component.scss'],
})
export class ContinentsCardComponent {
  continents: { text: string; id: string }[];

  constructor() {
    this.continents = [
      { text: 'Africa', id: 'africa' },
      { text: 'Antarctica', id: 'antarctica' },
      { text: 'Asia', id: 'asia' },
      { text: 'Oceania', id: 'oceania' },
      { text: 'Europe', id: 'europe' },
      { text: 'North America', id: 'north-america' },
      { text: 'South America', id: 'south-america' },
    ];
  }
}
