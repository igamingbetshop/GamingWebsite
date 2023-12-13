import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileUssdPinComponent } from './mobile-ussd-pin.component';

describe('UssdPinComponent', () => {
  let component: MobileUssdPinComponent;
  let fixture: ComponentFixture<MobileUssdPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileUssdPinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileUssdPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
