import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDealsListComponent } from './chat-deals-list.component';

describe('ChatDealsListComponent', () => {
  let component: ChatDealsListComponent;
  let fixture: ComponentFixture<ChatDealsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatDealsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDealsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
