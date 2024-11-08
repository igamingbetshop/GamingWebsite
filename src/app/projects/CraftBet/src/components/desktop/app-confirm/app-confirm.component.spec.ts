import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppConfirmComponent } from './app-confirm.component';

describe('AppConfirmComponent', () => {
  let component: AppConfirmComponent;
  let fixture: ComponentFixture<AppConfirmComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AppConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
