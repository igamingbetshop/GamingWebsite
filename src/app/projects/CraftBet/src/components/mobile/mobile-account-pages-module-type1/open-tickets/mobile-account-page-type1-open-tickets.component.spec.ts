import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAccountPageType1OpenTicketsComponent } from './mobile-account-page-type1-open-tickets.component';

describe('MobileAccountPageType1OpenTicketsComponent', () => {
  let component: MobileAccountPageType1OpenTicketsComponent;
  let fixture: ComponentFixture<MobileAccountPageType1OpenTicketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType1OpenTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAccountPageType1OpenTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
