import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnblockPopupComponent } from './unblock-popup.component';

describe('UnblockPopupComponent', () => {
  let component: UnblockPopupComponent;
  let fixture: ComponentFixture<UnblockPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnblockPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnblockPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
