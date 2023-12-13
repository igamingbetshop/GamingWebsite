import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CustomBlockSettingsComponent } from './custom-block-settings.component';

describe('CustomBlockSettingsComponent', () => {
  let component: CustomBlockSettingsComponent;
  let fixture: ComponentFixture<CustomBlockSettingsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomBlockSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomBlockSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
