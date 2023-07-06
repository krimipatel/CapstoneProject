import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderIndividualComponent } from './order-individual.component';

describe('OrderIndividualComponent', () => {
  let component: OrderIndividualComponent;
  let fixture: ComponentFixture<OrderIndividualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderIndividualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
