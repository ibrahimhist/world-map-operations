import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinentsCardComponent } from './continents-card.component';

describe('ContinentsCardComponent', () => {
  let component: ContinentsCardComponent;
  let fixture: ComponentFixture<ContinentsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContinentsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContinentsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
