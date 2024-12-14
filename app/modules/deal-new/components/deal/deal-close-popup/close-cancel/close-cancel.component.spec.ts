import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseCancelComponent } from './close-cancel.component';

describe('CloseCancelComponent', () => {
  let component: CloseCancelComponent;
  let fixture: ComponentFixture<CloseCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
