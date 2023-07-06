import { Component, OnInit } from '@angular/core';
import { CalculatorService } from 'src/app/services/vendor/calculator/calculator.service';

@Component({
  selector: 'app-offer-notice',
  templateUrl: './offer-notice.component.html',
  styleUrls: ['./offer-notice.component.css']
})
export class OfferNoticeComponent implements OnInit {

  constructor(private calService : CalculatorService) { }

  recordExist : boolean = false;
  record :any;


  ngOnInit(): void {
    this.calService.checkOffer().subscribe(res=>{
      console.log(res);
      if(res == "No records" || res === null){
        this.recordExist = false;
      }
      else{
        this.recordExist = true;
        this.record = res;
      }
    },(err)=>{
      console.log(err)
    })
  }

  createProduct(){
    var createdUrl = `?productName=${this.record.productName}&productDescription=${this.record.productDescription}&price=${this.record.msrp}`
    location.href = "vendor/addproduct"+createdUrl
  }

  deleteOffer(){
    this.calService.deleteOffer().subscribe(res=>{
      this.recordExist = false;
    })
  }

}
