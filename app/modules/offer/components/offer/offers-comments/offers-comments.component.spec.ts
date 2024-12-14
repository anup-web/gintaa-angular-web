import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersCommentsComponent } from './offers-comments.component';

describe('OffersCommentsComponent', () => {
  let component: OffersCommentsComponent;
  let fixture: ComponentFixture<OffersCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
