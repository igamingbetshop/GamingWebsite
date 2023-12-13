import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CommonGetTextComponent } from './common-get-text.component';

describe('CommonGetTextComponent', () => {
  let component: CommonGetTextComponent;
  let fixture: ComponentFixture<CommonGetTextComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonGetTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonGetTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
