import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferNoticeComponent } from './offer-notice.component';

describe('OfferNoticeComponent', () => {
  let component: OfferNoticeComponent;
  let fixture: ComponentFixture<OfferNoticeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OfferNoticeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
