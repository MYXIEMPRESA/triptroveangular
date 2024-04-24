import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsociateComponent } from './asociate.component';

describe('AsociateComponent', () => {
  let component: AsociateComponent;
  let fixture: ComponentFixture<AsociateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsociateComponent]
    });
    fixture = TestBed.createComponent(AsociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
