import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTagListComponent } from './search-tag-list.component';

describe('SearchTagListComponent', () => {
  let component: SearchTagListComponent;
  let fixture: ComponentFixture<SearchTagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTagListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
