import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpAndGuideComponent } from './help-and-guide.component';

describe('HelpAndGuideComponent', () => {
  let component: HelpAndGuideComponent;
  let fixture: ComponentFixture<HelpAndGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpAndGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpAndGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
