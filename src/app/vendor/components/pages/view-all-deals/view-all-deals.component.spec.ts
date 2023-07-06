import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllDealsComponent } from './view-all-deals.component';

describe('ViewAllDealsComponent', () => {
  let component: ViewAllDealsComponent;
  let fixture: ComponentFixture<ViewAllDealsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAllDealsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
