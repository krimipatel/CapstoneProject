import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from 'src/app/app.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { VendorProductPageComponent } from './vendor-product-page.component';
import { DealsService } from 'src/app/services/vendor/deals/deals.service';
import { ProductService } from 'src/app/services/vendor/Product/product.service';

describe('VendorProductPageComponent', () => {
  let component: VendorProductPageComponent;
  let fixture: ComponentFixture<VendorProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, VendorProductPageComponent ],
      imports:[BrowserModule, HttpClientModule, RouterTestingModule, HttpClientTestingModule],
      providers:[HttpClient, DealsService, ProductService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
