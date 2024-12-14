import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealClosePopupComponent } from './deal-close-popup.component';

describe('DealClosePopupComponent', () => {
  let component: DealClosePopupComponent;
  let fixture: ComponentFixture<DealClosePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealClosePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealClosePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
