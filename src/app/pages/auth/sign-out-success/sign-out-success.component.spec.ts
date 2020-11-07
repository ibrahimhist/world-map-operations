import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOutSuccessComponent } from './sign-out-success.component';

describe('SignOutSuccessComponent', () => {
  let component: SignOutSuccessComponent;
  let fixture: ComponentFixture<SignOutSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignOutSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOutSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
