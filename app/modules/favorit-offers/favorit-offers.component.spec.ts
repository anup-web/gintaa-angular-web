import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritOffersComponent } from './favorit-offers.component';

describe('FavoritOffersComponent', () => {
  let component: FavoritOffersComponent;
  let fixture: ComponentFixture<FavoritOffersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritOffersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
