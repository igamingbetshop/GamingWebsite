import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AccountPageType2TicketsComponent } from './account-page-type2-tickets.component';

describe('AccountPageType2TicketsComponent', () => {
  let component: AccountPageType2TicketsComponent;
  let fixture: ComponentFixture<AccountPageType2TicketsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountPageType2TicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountPageType2TicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
