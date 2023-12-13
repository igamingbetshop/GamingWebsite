import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelfLimitationComponent } from './self-limitation.component';

describe('SelfLimitationComponent', () => {
  let component: SelfLimitationComponent;
  let fixture: ComponentFixture<SelfLimitationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfLimitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfLimitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
