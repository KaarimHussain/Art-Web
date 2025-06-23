import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryManagementComponent } from './gallery-management.component';

describe('GalleryManagementComponent', () => {
  let component: GalleryManagementComponent;
  let fixture: ComponentFixture<GalleryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
