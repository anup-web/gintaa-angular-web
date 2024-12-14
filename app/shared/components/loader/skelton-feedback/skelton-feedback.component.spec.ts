import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeltonFedbackComponent } from './skelton-feedback.component';

describe('SkeltonFedbackComponent', () => {
  let component: SkeltonFedbackComponent;
  let fixture: ComponentFixture<SkeltonFedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeltonFedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeltonFedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
