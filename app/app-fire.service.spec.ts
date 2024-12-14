import { TestBed } from '@angular/core/testing';

import { AppFireService } from './app-fire.service';

describe('AppFireService', () => {
  let service: AppFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
