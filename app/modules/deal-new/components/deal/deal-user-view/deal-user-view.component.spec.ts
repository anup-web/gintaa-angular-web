import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealUserViewComponent } from './deal-user-view.component';

describe('DealUserViewComponent', () => {
  let component: DealUserViewComponent;
  let fixture: ComponentFixture<DealUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealUserViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
