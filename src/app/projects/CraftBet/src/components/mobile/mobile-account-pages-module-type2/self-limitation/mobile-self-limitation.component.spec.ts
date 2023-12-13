import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileSelfLimitationComponent } from './mobile-self-limitation.component';

describe('MobileSelfLimitationComponent', () => {
  let component: MobileSelfLimitationComponent;
  let fixture: ComponentFixture<MobileSelfLimitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobileSelfLimitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MobileSelfLimitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
