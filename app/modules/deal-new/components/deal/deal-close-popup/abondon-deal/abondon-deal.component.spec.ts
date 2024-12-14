import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbondonDealComponent } from './abondon-deal.component';

describe('AbondonDealComponent', () => {
  let component: AbondonDealComponent;
  let fixture: ComponentFixture<AbondonDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbondonDealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbondonDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
