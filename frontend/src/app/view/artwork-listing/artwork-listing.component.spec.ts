import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtworkListingComponent } from './artwork-listing.component';

describe('ArtworkListingComponent', () => {
  let component: ArtworkListingComponent;
  let fixture: ComponentFixture<ArtworkListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtworkListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtworkListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
