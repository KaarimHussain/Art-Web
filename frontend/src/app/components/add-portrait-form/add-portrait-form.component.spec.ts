import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPortraitFormComponent } from './add-portrait-form.component';

describe('AddPortraitFormComponent', () => {
  let component: AddPortraitFormComponent;
  let fixture: ComponentFixture<AddPortraitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPortraitFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPortraitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
