import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatDealItemShowcaseComponent } from './chat-deal-item-showcase.component';

describe('ChatDealItemShowcaseComponent', () => {
  let component: ChatDealItemShowcaseComponent;
  let fixture: ComponentFixture<ChatDealItemShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatDealItemShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatDealItemShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
