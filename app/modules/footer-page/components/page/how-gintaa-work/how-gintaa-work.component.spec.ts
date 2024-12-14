import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowGintaaWorkComponent } from './how-gintaa-work.component';

describe('HowGintaaWorkComponent', () => {
  let component: HowGintaaWorkComponent;
  let fixture: ComponentFixture<HowGintaaWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowGintaaWorkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowGintaaWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
