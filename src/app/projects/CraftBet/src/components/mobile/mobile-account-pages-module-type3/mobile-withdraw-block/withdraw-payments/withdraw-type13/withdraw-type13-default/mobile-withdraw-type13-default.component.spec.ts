import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileWithdrawType13DefaultComponent } from './mobile-withdraw-type13-default.component';

describe('MobileWithdrawType13DefaultComponent', () => {
  let component: MobileWithdrawType13DefaultComponent;
  let fixture: ComponentFixture<MobileWithdrawType13DefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileWithdrawType13DefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileWithdrawType13DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
