import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldMapCardComponent } from './world-map-card.component';

describe('WorldMapCardComponent', () => {
  let component: WorldMapCardComponent;
  let fixture: ComponentFixture<WorldMapCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldMapCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldMapCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
