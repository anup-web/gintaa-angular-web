import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OffersbyMemberComponent } from './offersby-member.component';

describe('OffersbyMemberComponent', () => {
  let component: OffersbyMemberComponent;
  let fixture: ComponentFixture<OffersbyMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OffersbyMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OffersbyMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
