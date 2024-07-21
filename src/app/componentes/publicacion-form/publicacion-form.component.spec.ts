import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublicacionFormComponent } from './publicacion-form.component';

describe('PublicacionFormComponent', () => {
  let component: PublicacionFormComponent;
  let fixture: ComponentFixture<PublicacionFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PublicacionFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicacionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
