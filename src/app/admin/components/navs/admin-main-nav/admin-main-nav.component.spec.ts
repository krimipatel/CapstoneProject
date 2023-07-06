import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainNavComponent } from './admin-main-nav.component';

describe('AdminMainNavComponent', () => {
  let component: AdminMainNavComponent;
  let fixture: ComponentFixture<AdminMainNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMainNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMainNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
