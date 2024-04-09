import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBardComponent } from './search-bard.component';

describe('SearchBardComponent', () => {
  let component: SearchBardComponent;
  let fixture: ComponentFixture<SearchBardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBardComponent]
    });
    fixture = TestBed.createComponent(SearchBardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
