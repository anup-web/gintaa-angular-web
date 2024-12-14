import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOfferPrimaryInfoComponent } from './create-offer-primary-info.component';

describe('CreateOfferPrimaryInfoComponent', () => {
  let component: CreateOfferPrimaryInfoComponent;
  let fixture: ComponentFixture<CreateOfferPrimaryInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOfferPrimaryInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOfferPrimaryInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
