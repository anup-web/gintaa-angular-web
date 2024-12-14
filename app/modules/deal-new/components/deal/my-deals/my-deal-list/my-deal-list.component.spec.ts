import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDealListComponent } from './my-deal-list.component';

describe('MyDealListComponent', () => {
  let component: MyDealListComponent;
  let fixture: ComponentFixture<MyDealListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDealListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDealListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
