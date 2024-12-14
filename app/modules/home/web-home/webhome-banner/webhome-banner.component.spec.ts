import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhomeBannerComponent } from './webhome-banner.component';

describe('WebhomeBannerComponent', () => {
  let component: WebhomeBannerComponent;
  let fixture: ComponentFixture<WebhomeBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhomeBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhomeBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
