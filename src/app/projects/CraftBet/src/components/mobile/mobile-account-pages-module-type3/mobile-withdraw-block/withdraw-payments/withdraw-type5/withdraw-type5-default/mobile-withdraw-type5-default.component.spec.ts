import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawType5DefaultComponent } from './mobile-withdraw-type5-default.component';

describe('MobileWithdrawType5DefaultComponent', () => {
  let component: MobileWithdrawType5DefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawType5DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawType5DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawType5DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
