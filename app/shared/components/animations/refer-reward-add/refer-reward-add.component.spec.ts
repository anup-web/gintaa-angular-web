import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferRewardAddComponent } from './refer-reward-add.component';

describe('ReferRewardAddComponent', () => {
  let component: ReferRewardAddComponent;
  let fixture: ComponentFixture<ReferRewardAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferRewardAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferRewardAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
