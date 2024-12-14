import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhomeMatchBoxComponent } from './webhome-match-box.component';

describe('WebhomeMatchBoxComponent', () => {
  let component: WebhomeMatchBoxComponent;
  let fixture: ComponentFixture<WebhomeMatchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhomeMatchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhomeMatchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
