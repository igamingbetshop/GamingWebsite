import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MobileAboutUsComponent } from './mobile-about-us.component';

describe('MobileAboutUsComponent', () => {
  let component: MobileAboutUsComponent;
  let fixture: ComponentFixture<MobileAboutUsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileAboutUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileAboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
