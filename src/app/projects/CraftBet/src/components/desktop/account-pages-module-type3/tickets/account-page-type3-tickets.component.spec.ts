import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType3TicketsComponent } from './account-page-type3-tickets.component';

describe('AccountPageType3TicketsComponent', () => {
  let component: AccountPageType3TicketsComponent;
  let fixture: ComponentFixture<AccountPageType3TicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPageType3TicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPageType3TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
