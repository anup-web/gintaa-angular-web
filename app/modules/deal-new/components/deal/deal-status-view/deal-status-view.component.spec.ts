import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealStatusViewComponent } from './deal-status-view.component';

describe('DealStatusViewComponent', () => {
  let component: DealStatusViewComponent;
  let fixture: ComponentFixture<DealStatusViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealStatusViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealStatusViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
