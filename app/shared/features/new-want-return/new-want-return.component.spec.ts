import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWantReturnComponent } from './new-want-return.component';

describe('NewWantReturnComponent', () => {
  let component: NewWantReturnComponent;
  let fixture: ComponentFixture<NewWantReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWantReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWantReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
