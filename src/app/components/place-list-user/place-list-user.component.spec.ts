import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceListUserComponent } from './place-list-user.component';

describe('PlaceListUserComponent', () => {
  let component: PlaceListUserComponent;
  let fixture: ComponentFixture<PlaceListUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceListUserComponent]
    });
    fixture = TestBed.createComponent(PlaceListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
