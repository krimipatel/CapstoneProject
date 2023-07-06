import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSimpleNavComponent } from './admin-simple-nav.component';

describe('AdminSimpleNavComponent', () => {
  let component: AdminSimpleNavComponent;
  let fixture: ComponentFixture<AdminSimpleNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSimpleNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSimpleNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
