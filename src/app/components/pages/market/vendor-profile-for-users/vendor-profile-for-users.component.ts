import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarketService } from 'src/app/services/ResidentialUser/market/market.service';


@Component({
  selector: 'app-vendor-profile-for-users',
  templateUrl: './vendor-profile-for-users.component.html',
  styleUrls: ['./vendor-profile-for-users.component.css']
})
export class VendorProfileForUsersComponent implements OnInit {

  vendorDetails:any

  gotInfo:boolean=false;

  constructor(private service:MarketService, private route:ActivatedRoute) { }

  ngOnInit(): void {

    let Vendor:any=""

    this.route.params.subscribe(params=>{
      Vendor = params["shopid"]
      console.log(Vendor)
      // Vendor = Vendor.split('%20').join(' ')

      this.service.getVendorProfile(Vendor).subscribe(res=>{
        this.vendorDetails = res;
        this.gotInfo=true;
        console.log(this.vendorDetails)
      })
    })
    
    
  }

  refreshDetails(data:any){
    this.service.followVendor(data).subscribe(res=>{
      if (res) {
        this.service.getVendorProfile(this.vendorDetails.Vendor).subscribe(res=>{
          this.vendorDetails = res;
          console.log(res)
        })
      }
    })
  }

  followVendor(){
    var data = {
      Vendor:this.vendorDetails.Vendor,
      status: this.vendorDetails.is_following=="True" ? "Unfollow" : "Follow" 
    }
    this.vendorDetails.is_following = this.vendorDetails.is_following=="True" ? "False" : "True";
    this.refreshDetails(data)
  }

}
