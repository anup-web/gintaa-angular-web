import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrowBusinessComponent } from './grow-business.component';

describe('GrowBusinessComponent', () => {
  let component: GrowBusinessComponent;
  let fixture: ComponentFixture<GrowBusinessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrowBusinessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrowBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
