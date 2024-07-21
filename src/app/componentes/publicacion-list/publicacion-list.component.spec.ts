import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PublicacionListComponent } from './publicacion-list.component';

describe('PublicacionListComponent', () => {
  let component: PublicacionListComponent;
  let fixture: ComponentFixture<PublicacionListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PublicacionListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicacionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
