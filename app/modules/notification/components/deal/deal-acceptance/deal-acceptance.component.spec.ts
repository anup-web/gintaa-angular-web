import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealAcceptanceComponent } from './deal-acceptance.component';

describe('DealAcceptanceComponent', () => {
  let component: DealAcceptanceComponent;
  let fixture: ComponentFixture<DealAcceptanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealAcceptanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealAcceptanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
