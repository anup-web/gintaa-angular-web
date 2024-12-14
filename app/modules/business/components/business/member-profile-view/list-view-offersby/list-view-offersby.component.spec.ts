import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewOffersbyComponent } from './list-view-offersby.component';

describe('ListViewOffersbyComponent', () => {
  let component: ListViewOffersbyComponent;
  let fixture: ComponentFixture<ListViewOffersbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListViewOffersbyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewOffersbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
