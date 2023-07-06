import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketDealComponent } from './market-deal.component';

describe('MarketDealComponent', () => {
  let component: MarketDealComponent;
  let fixture: ComponentFixture<MarketDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketDealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
