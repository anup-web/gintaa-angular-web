import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GintaaJunctionComponent } from './gintaa-junction.component';

describe('GintaaJunctionComponent', () => {
  let component: GintaaJunctionComponent;
  let fixture: ComponentFixture<GintaaJunctionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GintaaJunctionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GintaaJunctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
