import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2StatmentComponent } from './mobile-account-page-type2-statment.component';

describe('MobileAccountPageType2StatmentComponent', () => {
  let component: MobileAccountPageType2StatmentComponent;
  let fixture: ComponentFixture<MobileAccountPageType2StatmentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2StatmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2StatmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
