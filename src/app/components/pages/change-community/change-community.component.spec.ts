import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCommunityComponent } from './change-community.component';

describe('ChangeCommunityComponent', () => {
  let component: ChangeCommunityComponent;
  let fixture: ComponentFixture<ChangeCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeCommunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
