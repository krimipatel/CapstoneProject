import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletToolboxComponent } from './wallet-toolbox.component';

describe('WalletToolboxComponent', () => {
  let component: WalletToolboxComponent;
  let fixture: ComponentFixture<WalletToolboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletToolboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WalletToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
