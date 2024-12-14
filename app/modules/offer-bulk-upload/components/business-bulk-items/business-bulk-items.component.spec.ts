import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessBulkItemsComponent } from './business-bulk-items.component';

describe('BusinessBulkItemsComponent', () => {
  let component: BusinessBulkItemsComponent;
  let fixture: ComponentFixture<BusinessBulkItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessBulkItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessBulkItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
