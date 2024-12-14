import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeSecureComponent } from './safe-secure.component';

describe('SafeSecureComponent', () => {
  let component: SafeSecureComponent;
  let fixture: ComponentFixture<SafeSecureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafeSecureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeSecureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
