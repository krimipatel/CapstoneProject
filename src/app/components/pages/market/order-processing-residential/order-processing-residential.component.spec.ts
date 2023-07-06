import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProcessingResidentialComponent } from './order-processing-residential.component';

describe('OrderProcessingResidentialComponent', () => {
  let component: OrderProcessingResidentialComponent;
  let fixture: ComponentFixture<OrderProcessingResidentialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProcessingResidentialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProcessingResidentialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
