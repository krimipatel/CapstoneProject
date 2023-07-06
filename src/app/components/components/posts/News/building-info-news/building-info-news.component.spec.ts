import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildingInfoNewsComponent } from './building-info-news.component';

describe('BuildingInfoNewsComponent', () => {
  let component: BuildingInfoNewsComponent;
  let fixture: ComponentFixture<BuildingInfoNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildingInfoNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildingInfoNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
