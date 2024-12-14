import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDealCommentsComponent } from './company-deal-comments.component';

describe('CompanyDealCommentsComponent', () => {
  let component: CompanyDealCommentsComponent;
  let fixture: ComponentFixture<CompanyDealCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDealCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDealCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
