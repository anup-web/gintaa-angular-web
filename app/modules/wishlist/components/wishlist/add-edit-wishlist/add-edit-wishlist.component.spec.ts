import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditWishlistComponent } from './add-edit-wishlist.component';

describe('AddEditWishlistComponent', () => {
  let component: AddEditWishlistComponent;
  let fixture: ComponentFixture<AddEditWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
