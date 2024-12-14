import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatReportUserComponent } from './chat-report-user.component';

describe('ChatReportUserComponent', () => {
  let component: ChatReportUserComponent;
  let fixture: ComponentFixture<ChatReportUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatReportUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatReportUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
