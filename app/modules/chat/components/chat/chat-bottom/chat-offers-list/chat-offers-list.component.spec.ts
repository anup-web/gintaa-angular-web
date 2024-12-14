import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatOffersListComponent } from './chat-offers-list.component';

describe('ChatOffersListComponent', () => {
  let component: ChatOffersListComponent;
  let fixture: ComponentFixture<ChatOffersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatOffersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatOffersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
