import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerChangeComponent } from './owner-change.component';

describe('OwnerChangeComponent', () => {
  let component: OwnerChangeComponent;
  let fixture: ComponentFixture<OwnerChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnerChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnerChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
