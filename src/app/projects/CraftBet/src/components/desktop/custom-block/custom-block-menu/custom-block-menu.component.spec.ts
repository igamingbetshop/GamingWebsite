import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomBlockMenuComponent } from './custom-block-menu.component';

describe('CustomBlockMenuComponent', () => {
  let component: CustomBlockMenuComponent;
  let fixture: ComponentFixture<CustomBlockMenuComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBlockMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBlockMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
