import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppLiveCasinoComponent } from './app-live-casino.component';

describe('AppLiveCasinoComponent', () => {
  let component: AppLiveCasinoComponent;
  let fixture: ComponentFixture<AppLiveCasinoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppLiveCasinoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLiveCasinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
