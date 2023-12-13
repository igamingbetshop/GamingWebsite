import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1BetsComponent } from './mobile-account-page-type1-bets.component';

describe('MobileAccountPageType1BetsComponent', () => {
  let component: MobileAccountPageType1BetsComponent;
  let fixture: ComponentFixture<MobileAccountPageType1BetsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1BetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1BetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
