import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessDealCloseComponent } from './success-deal-close.component';

describe('SuccessDealCloseComponent', () => {
  let component: SuccessDealCloseComponent;
  let fixture: ComponentFixture<SuccessDealCloseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessDealCloseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessDealCloseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
