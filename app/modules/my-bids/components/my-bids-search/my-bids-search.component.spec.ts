import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBidsSearchComponent } from './my-bids-search.component';

describe('MyBidsSearchComponent', () => {
  let component: MyBidsSearchComponent;
  let fixture: ComponentFixture<MyBidsSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBidsSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBidsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
