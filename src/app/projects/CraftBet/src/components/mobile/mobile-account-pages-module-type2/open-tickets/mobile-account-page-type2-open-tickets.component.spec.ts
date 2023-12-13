import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2OpenTicketsComponent } from './mobile-account-page-type2-open-tickets.component';

describe('MobileAccountPageType2OpenTicketsComponent', () => {
  let component: MobileAccountPageType2OpenTicketsComponent;
  let fixture: ComponentFixture<MobileAccountPageType2OpenTicketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2OpenTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2OpenTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
