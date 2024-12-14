import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserCommentsComponent } from './all-user-comments.component';

describe('AllUserCommentsComponent', () => {
  let component: AllUserCommentsComponent;
  let fixture: ComponentFixture<AllUserCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllUserCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllUserCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
