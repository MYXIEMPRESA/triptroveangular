import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenUploadLocationComponent } from './screen-upload-location.component';

describe('ScreenUploadLocationComponent', () => {
  let component: ScreenUploadLocationComponent;
  let fixture: ComponentFixture<ScreenUploadLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreenUploadLocationComponent]
    });
    fixture = TestBed.createComponent(ScreenUploadLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
