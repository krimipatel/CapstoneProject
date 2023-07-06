import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressSignINComponent } from './express-sign-in.component';

describe('ExpressSignINComponent', () => {
  let component: ExpressSignINComponent;
  let fixture: ComponentFixture<ExpressSignINComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressSignINComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressSignINComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
