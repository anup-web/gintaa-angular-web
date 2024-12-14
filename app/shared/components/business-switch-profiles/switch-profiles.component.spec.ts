import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchProfilesComponent } from './switch-profiles.component';

describe('SwitchProfilesComponent', () => {
  let component: SwitchProfilesComponent;
  let fixture: ComponentFixture<SwitchProfilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchProfilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
