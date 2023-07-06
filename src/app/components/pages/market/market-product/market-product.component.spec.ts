import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketProductComponent } from './market-product.component';

describe('MarketProductComponent', () => {
  let component: MarketProductComponent;
  let fixture: ComponentFixture<MarketProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
