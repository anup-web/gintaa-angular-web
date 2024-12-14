import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareRewardsComponent } from './share-rewards.component';

describe('ShareRewardsComponent', () => {
  let component: ShareRewardsComponent;
  let fixture: ComponentFixture<ShareRewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareRewardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
