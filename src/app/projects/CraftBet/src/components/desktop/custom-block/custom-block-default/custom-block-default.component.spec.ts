import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomBlockDefaultComponent } from './custom-block-default.component';

describe('CustomBlockDefaultComponent', () => {
  let component: CustomBlockDefaultComponent;
  let fixture: ComponentFixture<CustomBlockDefaultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBlockDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBlockDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
