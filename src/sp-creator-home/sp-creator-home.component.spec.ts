import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpCreatorHomeComponent } from './sp-creator-home.component';

describe('SpCreatorHomeComponent', () => {
  let component: SpCreatorHomeComponent;
  let fixture: ComponentFixture<SpCreatorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpCreatorHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpCreatorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
