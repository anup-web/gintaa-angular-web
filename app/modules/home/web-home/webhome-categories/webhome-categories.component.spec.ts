import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebhomeCategoriesComponent } from './webhome-categories.component';

describe('WebhomeCategoriesComponent', () => {
  let component: WebhomeCategoriesComponent;
  let fixture: ComponentFixture<WebhomeCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebhomeCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebhomeCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
