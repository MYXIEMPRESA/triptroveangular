import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDocsComponent } from './request-docs.component';

describe('RequestDocsComponent', () => {
  let component: RequestDocsComponent;
  let fixture: ComponentFixture<RequestDocsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestDocsComponent]
    });
    fixture = TestBed.createComponent(RequestDocsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
