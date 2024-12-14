import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutGintaaComponent } from './about-gintaa.component';

describe('AboutGintaaComponent', () => {
  let component: AboutGintaaComponent;
  let fixture: ComponentFixture<AboutGintaaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutGintaaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutGintaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
