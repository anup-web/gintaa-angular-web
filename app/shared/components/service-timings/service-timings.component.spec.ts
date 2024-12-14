import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTimingsComponent } from './service-timings.component';

describe('ServiceTimingsComponent', () => {
  let component: ServiceTimingsComponent;
  let fixture: ComponentFixture<ServiceTimingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTimingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTimingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
