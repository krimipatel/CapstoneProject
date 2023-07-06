import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSandBoxComponent } from './test-sand-box.component';

describe('TestSandBoxComponent', () => {
  let component: TestSandBoxComponent;
  let fixture: ComponentFixture<TestSandBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestSandBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSandBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
