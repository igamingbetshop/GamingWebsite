import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UssdPinComponent } from './ussd-pin.component';

describe('UssdPinComponent', () => {
  let component: UssdPinComponent;
  let fixture: ComponentFixture<UssdPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UssdPinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UssdPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
