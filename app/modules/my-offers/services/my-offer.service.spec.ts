import { TestBed } from '@angular/core/testing';

import { MyOfferService } from './my-offer.service';

describe('MyOfferService', () => {
  let service: MyOfferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyOfferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
