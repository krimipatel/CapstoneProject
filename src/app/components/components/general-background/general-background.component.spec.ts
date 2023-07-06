import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralBackgroundComponent } from './general-background.component';

describe('GeneralBackgroundComponent', () => {
  let component: GeneralBackgroundComponent;
  let fixture: ComponentFixture<GeneralBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralBackgroundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
