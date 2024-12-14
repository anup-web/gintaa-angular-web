import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingPolicyComponent } from './listing-policy.component';

describe('ListingPolicyComponent', () => {
  let component: ListingPolicyComponent;
  let fixture: ComponentFixture<ListingPolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListingPolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
