import { ArrayType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { SupportService } from 'src/app/services/common/support/support.service';

interface res {
  id:Number;
  category:String;
  question : String;
  answer : String;
}

interface FAQ{
  Question : String;
  Answer : String;
}

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  constructor(private supportService : SupportService) { }

  token:any;
  // -- respective FAQs
  faqs!:res[];
  vendorFAQ!:res[];
  residentialFAQ! :res[];

  ngOnInit(): void {
    //assigning FAQs from service
   this.token = localStorage.getItem("token");



    this.supportService.getFAQS().subscribe(res=>{
      this.faqs=res;
      var residential = new Array();
      var vendor = new Array();

      for(let f=0 ;f<this.faqs.length;f++){

        if(this.faqs[f].category == "residentialuser"){

          residential.push(this.faqs[f]);

        }
        else{
          vendor.push(this.faqs[f]);
        }

      }

      this.residentialFAQ=residential;
      this.vendorFAQ=vendor;

      console.log(this.vendorFAQ);
      console.log(this.residentialFAQ);

    });
  }






}
