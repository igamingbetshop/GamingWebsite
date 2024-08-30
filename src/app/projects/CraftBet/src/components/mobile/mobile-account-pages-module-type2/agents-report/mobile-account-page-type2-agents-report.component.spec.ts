import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileAccountPageType2AgentsReportComponent } from './mobile-account-page-type2-agents-report.component';

describe('MobileAccountPageType2AgentsReportComponent', () => {
  let component: MobileAccountPageType2AgentsReportComponent;
  let fixture: ComponentFixture<MobileAccountPageType2AgentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileAccountPageType2AgentsReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MobileAccountPageType2AgentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
