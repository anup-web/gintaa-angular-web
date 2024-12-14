import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveBusinessAccountComponent } from './inactive-business-account.component';

describe('BusinessAccountComponent', () => {
  let component: InactiveBusinessAccountComponent;
  let fixture: ComponentFixture<InactiveBusinessAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveBusinessAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveBusinessAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
