import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessDealComponent } from './process-deal.component';

describe('ProcessDealComponent', () => {
  let component: ProcessDealComponent;
  let fixture: ComponentFixture<ProcessDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessDealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
