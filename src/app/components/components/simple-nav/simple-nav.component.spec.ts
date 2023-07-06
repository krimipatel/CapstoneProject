import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleNavComponent } from './simple-nav.component';

describe('SimpleNavComponent', () => {
  let component: SimpleNavComponent;
  let fixture: ComponentFixture<SimpleNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SimpleNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
