import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBasicInfoComponent } from './member-basic-info.component';

describe('MemberBasicInfoComponent', () => {
  let component: MemberBasicInfoComponent;
  let fixture: ComponentFixture<MemberBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
