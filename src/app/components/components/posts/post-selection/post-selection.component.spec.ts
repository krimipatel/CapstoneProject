import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSelectionComponent } from './post-selection.component';

describe('PostSelectionComponent', () => {
  let component: PostSelectionComponent;
  let fixture: ComponentFixture<PostSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
