import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPageType2AgentsReportComponent } from './account-page-type2-agents-report.component';

describe('AccountPageType2AgentsReportComponent', () => {
  let component: AccountPageType2AgentsReportComponent;
  let fixture: ComponentFixture<AccountPageType2AgentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountPageType2AgentsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountPageType2AgentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
