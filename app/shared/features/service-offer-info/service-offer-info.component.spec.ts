import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOfferInfoComponent } from './service-offer-info.component';

describe('ServiceOfferInfoComponent', () => {
  let component: ServiceOfferInfoComponent;
  let fixture: ComponentFixture<ServiceOfferInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceOfferInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceOfferInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
