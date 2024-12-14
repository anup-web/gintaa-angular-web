import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDealHistoryComponent } from './new-deal-history.component';

describe('NewDealHistoryComponent', () => {
  let component: NewDealHistoryComponent;
  let fixture: ComponentFixture<NewDealHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewDealHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDealHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
