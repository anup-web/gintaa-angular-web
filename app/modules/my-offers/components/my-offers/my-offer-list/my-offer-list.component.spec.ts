import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOfferListComponent } from './my-offer-list.component';

describe('MyOfferListComponent', () => {
  let component: MyOfferListComponent;
  let fixture: ComponentFixture<MyOfferListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOfferListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOfferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
