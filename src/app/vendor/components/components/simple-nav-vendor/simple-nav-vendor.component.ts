import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-simple-nav-vendor',
  templateUrl: './simple-nav-vendor.component.html',
  styleUrls: ['./simple-nav-vendor.component.css']
})
export class SimpleNavVendorComponent implements OnInit {

  constructor(private router : Router) { }

  @Input() page:String='';

  ngOnInit(): void {
  }

  register(){
    this.router.navigateByUrl('/vendor',{state:{address:null}});
  }

}
