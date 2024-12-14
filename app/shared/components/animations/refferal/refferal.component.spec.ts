import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefferalComponent } from './refferal.component';

describe('RefferalComponent', () => {
  let component: RefferalComponent;
  let fixture: ComponentFixture<RefferalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefferalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefferalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
