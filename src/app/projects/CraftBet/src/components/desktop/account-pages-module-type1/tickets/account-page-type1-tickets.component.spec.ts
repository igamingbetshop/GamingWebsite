import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType1TicketsComponent } from './account-page-type1-tickets.component';

describe('AccountPageType1TicketsComponent', () => {
  let component: AccountPageType1TicketsComponent;
  let fixture: ComponentFixture<AccountPageType1TicketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType1TicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType1TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
