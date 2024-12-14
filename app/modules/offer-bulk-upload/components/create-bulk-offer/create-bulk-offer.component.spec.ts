import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBulkOfferComponent } from './create-bulk-offer.component';

describe('CreateBulkOfferComponent', () => {
  let component: CreateBulkOfferComponent;
  let fixture: ComponentFixture<CreateBulkOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBulkOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBulkOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
