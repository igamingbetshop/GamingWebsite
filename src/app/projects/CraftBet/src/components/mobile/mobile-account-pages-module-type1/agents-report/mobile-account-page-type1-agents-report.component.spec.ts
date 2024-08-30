import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccountPageType1AgentsReportComponent } from './mobile-account-page-type1-agents-report.component';

describe('MobileAccountPageType1AgentsReportComponent', () => {
  let component: MobileAccountPageType1AgentsReportComponent;
  let fixture: ComponentFixture<MobileAccountPageType1AgentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAccountPageType1AgentsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileAccountPageType1AgentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
