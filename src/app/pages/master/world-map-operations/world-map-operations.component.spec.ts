import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldMapOperationsComponent } from './world-map-operations.component';

describe('WorldMapOperationsComponent', () => {
  let component: WorldMapOperationsComponent;
  let fixture: ComponentFixture<WorldMapOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorldMapOperationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldMapOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
