import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupsRoutesComponent } from './popups-routes.component';

describe('PopupsRoutesComponent', () => {
  let component: PopupsRoutesComponent;
  let fixture: ComponentFixture<PopupsRoutesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupsRoutesComponent]
    });
    fixture = TestBed.createComponent(PopupsRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
