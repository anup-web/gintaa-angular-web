import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferRewardComponent } from './refer-reward.component';

describe('ReferRewardComponent', () => {
  let component: ReferRewardComponent;
  let fixture: ComponentFixture<ReferRewardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferRewardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
