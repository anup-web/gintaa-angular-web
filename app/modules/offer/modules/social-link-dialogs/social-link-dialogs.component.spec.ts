import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialLinkDialogsComponent } from './social-link-dialogs.component';

describe('SocialLinkDialogsComponent', () => {
  let component: SocialLinkDialogsComponent;
  let fixture: ComponentFixture<SocialLinkDialogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialLinkDialogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialLinkDialogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
