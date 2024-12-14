import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseSuccesfullComponent } from './close-succesfull.component';

describe('CloseSuccesfullComponent', () => {
  let component: CloseSuccesfullComponent;
  let fixture: ComponentFixture<CloseSuccesfullComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseSuccesfullComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseSuccesfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
