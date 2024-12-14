import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserReportBlockComponent } from './user-report-block.component';

describe('UserReportBlockComponent', () => {
  let component: UserReportBlockComponent;
  let fixture: ComponentFixture<UserReportBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserReportBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserReportBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
