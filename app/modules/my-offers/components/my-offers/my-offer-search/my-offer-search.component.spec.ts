import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOfferSearchComponent } from './my-offer-search.component';

describe('MyOfferSearchComponent', () => {
  let component: MyOfferSearchComponent;
  let fixture: ComponentFixture<MyOfferSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOfferSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOfferSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
