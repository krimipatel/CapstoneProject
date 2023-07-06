import { tokenName, tokenReference } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalculatorService } from 'src/app/services/vendor/calculator/calculator.service';
import { ProductService } from 'src/app/services/vendor/Product/product.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  calculateForm!:FormGroup;
  successMessage = '';
  errorMessage = '';
  authorized = false;
  loadingClass: string = "";

  constructor(private router:Router, private calculateService: CalculatorService) { }

  ngOnInit(): void {
    let token = localStorage.getItem("vendorToken");
    if(token != null) {
      this.authorized = true;
    }
    else {
      this.authorized = false;
    }
    
    this.calculateForm = new FormGroup({
      email:new FormControl('', Validators.required),
      productName:new FormControl('', Validators.required),
      productDescription:new FormControl(''),
      msrp:new FormControl('', Validators.required),
      gpBuyDiscount:new FormControl('', Validators.required),
      gpBuyMinSize:new FormControl('', Validators.required),
      canDeliver:new FormControl(false),
      shippingCost:new FormControl('', Validators.required)
    })

  }

  signin(){
    this.router.navigateByUrl('vendor/login');
  }

  signup(){
    this.router.navigateByUrl('vendor');
  }

  results :any[] = [

  ];

  deleteResult(index:any) {
    this.results.splice(index, 1);
  }


  submit(){
    var data = {
      email:this.calculateForm.controls.email.value,
      productName:this.calculateForm.controls.productName.value,
      productDescription:this.calculateForm.controls.productDescription.value,
      msrp:this.calculateForm.controls.msrp.value,
      gpBuyDiscount: this.calculateForm.controls.gpBuyDiscount.value,
      gpBuyMinSize: this.calculateForm.controls.gpBuyMinSize.value,
      canDeliver:this.calculateForm.controls.canDeliver.value,
      shippingCost: this.calculateForm.controls.shippingCost.value
    }

    console.log(data);

    this.calculateService.calculateOffer(data).subscribe(res=>{
      console.log(res);
      const apiResult:any = res;
      var addResult = {
        "pName" : data.productName,
        "discounted_customer_price": apiResult.discounted_customer_price,
        "naborino_commission": apiResult.naborino_commission,
        "shipping_savings": apiResult.shipping_savings,
        "creditcard_savings": apiResult.creditcard_savings,
        "total_payout": apiResult.total_payout

        // "msrp": data.msrp,
        // "gpBuyDiscount":data.gpBuyDiscount,
        // "gpMinSize" : data.gpBuyMinSize,
        // "result":res.total_revenue
      }
      console.log(addResult);
      this.results.push(addResult)

    },(err)=>{
      console.log(err);
    })

  }

  goToRegisterPage(){
    location.href = "vendor"
  }

  earlyVendorSignUp(){
    this.loadingClass = "waiting";

    if (this.calculateForm.controls.email.value=='') {
      this.errorMessage = "Please enter email";
      setTimeout(() => {
        this.errorMessage='';
      }, 5000);
    } else{
      var data = {
        "email": this.calculateForm.controls.email.value
      }

      console.log(data)

      this.calculateService.earlyVendorSignUp(data).subscribe(res=>{
        console.log(res);
        this.successMessage = "Email sent successfully";
        this.loadingClass = "";
      }, err=>{
        console.log(err);
        this.errorMessage = "Please try again later";
        this.loadingClass = "";
        setTimeout(() => {
          this.errorMessage='';
        }, 8000);
      })
    }
  }
}
