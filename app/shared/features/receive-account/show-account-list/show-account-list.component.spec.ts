import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAccountListComponent } from './show-account-list.component';

describe('ShowAccountListComponent', () => {
  let component: ShowAccountListComponent;
  let fixture: ComponentFixture<ShowAccountListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowAccountListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAccountListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
