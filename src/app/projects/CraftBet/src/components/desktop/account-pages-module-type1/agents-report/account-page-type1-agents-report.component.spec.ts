import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType1AgentsReportComponent } from './account-page-type1-agents-report.component';

describe('AgentsReportComponent', () => {
  let component: AccountPageType1AgentsReportComponent;
  let fixture: ComponentFixture<AccountPageType1AgentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPageType1AgentsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountPageType1AgentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
