import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType2TicketsComponent } from './mobile-account-page-type2-tickets.component';

describe('MobileAccountPageType2TicketsComponent', () => {
  let component: MobileAccountPageType2TicketsComponent;
  let fixture: ComponentFixture<MobileAccountPageType2TicketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType2TicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType2TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
