import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCancellationComponent } from './payment-cancellation.component';

describe('PaymentCancellationComponent', () => {
  let component: PaymentCancellationComponent;
  let fixture: ComponentFixture<PaymentCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCancellationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
