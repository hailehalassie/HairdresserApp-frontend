import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarberSelect } from './barber-select';

describe('BarberSelect', () => {
  let component: BarberSelect;
  let fixture: ComponentFixture<BarberSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarberSelect]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarberSelect);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
