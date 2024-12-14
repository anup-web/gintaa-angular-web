import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDealSearchComponent } from './my-deal-search.component';

describe('MyDealSearchComponent', () => {
  let component: MyDealSearchComponent;
  let fixture: ComponentFixture<MyDealSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDealSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDealSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
