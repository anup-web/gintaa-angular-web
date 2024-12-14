import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealChatHistoryComponent } from './deal-chat-history.component';

describe('DealChatHistoryComponent', () => {
  let component: DealChatHistoryComponent;
  let fixture: ComponentFixture<DealChatHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealChatHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealChatHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
