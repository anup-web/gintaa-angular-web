import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewOffersComponent } from './list-view-offers.component';

describe('ListViewOffersComponent', () => {
  let component: ListViewOffersComponent;
  let fixture: ComponentFixture<ListViewOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
