import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppCommonWithdrawComponent } from './app-common-withdraw.component';

describe('AppCommonWithdrawComponent', () => {
  let component: AppCommonWithdrawComponent;
  let fixture: ComponentFixture<AppCommonWithdrawComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppCommonWithdrawComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppCommonWithdrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
