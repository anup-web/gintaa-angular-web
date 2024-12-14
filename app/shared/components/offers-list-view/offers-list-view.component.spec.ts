import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersListViewComponent } from './offers-list-view.component';

describe('OffersListViewComponent', () => {
  let component: OffersListViewComponent;
  let fixture: ComponentFixture<OffersListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OffersListViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
