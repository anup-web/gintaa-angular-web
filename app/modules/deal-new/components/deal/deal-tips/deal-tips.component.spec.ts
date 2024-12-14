import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealTipsComponent } from './deal-tips.component';

describe('DealTipsComponent', () => {
  let component: DealTipsComponent;
  let fixture: ComponentFixture<DealTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
