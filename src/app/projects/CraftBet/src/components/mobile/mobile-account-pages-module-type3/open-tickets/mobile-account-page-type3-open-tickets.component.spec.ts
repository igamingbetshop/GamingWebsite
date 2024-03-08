import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccountPageType3OpenTicketsComponent } from './mobile-account-page-type3-open-tickets.component';

describe('MobileAccountPageType3OpenTicketsComponent', () => {
  let component: MobileAccountPageType3OpenTicketsComponent;
  let fixture: ComponentFixture<MobileAccountPageType3OpenTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileAccountPageType3OpenTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileAccountPageType3OpenTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
