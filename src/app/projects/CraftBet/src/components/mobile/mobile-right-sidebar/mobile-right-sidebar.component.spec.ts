import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileRightSidebarComponent } from './mobile-right-sidebar.component';

describe('MobileRightSidebarComponent', () => {
  let component: MobileRightSidebarComponent;
  let fixture: ComponentFixture<MobileRightSidebarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileRightSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileRightSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
