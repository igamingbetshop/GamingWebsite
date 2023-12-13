import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppOpenTicketComponent } from './app-open-ticket.component';

describe('AppOpenTicketComponent', () => {
  let component: AppOpenTicketComponent;
  let fixture: ComponentFixture<AppOpenTicketComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppOpenTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppOpenTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
