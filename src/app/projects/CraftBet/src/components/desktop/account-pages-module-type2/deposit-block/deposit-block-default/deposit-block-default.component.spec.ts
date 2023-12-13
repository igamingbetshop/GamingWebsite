import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DepositBlockDefaultComponent } from './deposit-block-default.component';

describe('DepositBlockDefaultComponent', () => {
  let component: DepositBlockDefaultComponent;
  let fixture: ComponentFixture<DepositBlockDefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositBlockDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositBlockDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
