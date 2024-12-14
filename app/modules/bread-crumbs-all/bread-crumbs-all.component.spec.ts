import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumbsAllComponent } from './bread-crumbs-all.component';

describe('BreadCrumbsAllComponent', () => {
  let component: BreadCrumbsAllComponent;
  let fixture: ComponentFixture<BreadCrumbsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadCrumbsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadCrumbsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
