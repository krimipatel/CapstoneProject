import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDealPostComponent } from './view-deal-post.component';

describe('ViewDealPostComponent', () => {
  let component: ViewDealPostComponent;
  let fixture: ComponentFixture<ViewDealPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDealPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDealPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
