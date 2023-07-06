
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommunityService } from 'src/app/services/ResidentialUser/community/community.service';
import { KnockService } from 'src/app/services/ResidentialUser/knock/knock.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import * as mapStyle from './maps.style.json';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


interface users {
  alias: string;
  user_details_id: number;
  connection_status: boolean;
  profile_photo: string;
}

@Component({
  selector: 'app-community-profile',
  templateUrl: './community-profile.component.html',
  styleUrls: ['./community-profile.component.css']
})
export class CommunityProfileComponent implements OnInit {

  constructor(private httpClient:HttpClient ,private router: Router, private communityService: CommunityService, private knockService: KnockService, private modalService: NgbModal) { }

  com_Address: String = '';
  com_Name: String = '';
  com_Postal: String = ''
  com_type: String = '';
  message: any = '';
  users !: users[];

  showToast: boolean = false;
  loading: boolean = true;
  @ViewChild('map') map!: ElementRef;
  @ViewChild('mapMobile') mapMobile!: ElementRef;
  coords:any;




  ngOnInit(): void {

    let loader = new Loader({
      apiKey: "AIzaSyDPMJfwU883rJRTiubBWpB_5zkKIpfllvY"
    })

    this.communityService.getCommunityInfo().subscribe(res => {
      this.com_Address = res.community_address;
      this.com_Name = res.community_name;
      this.users = res.User_list;
      this.com_type = res.community_type;
      console.log(res);
      this.loading = false;



      this.httpClient.post(environment.ResidentialUser+"residentialuser/geocode/?address=", {address:this.com_Address.split(' ').join('+')}).subscribe(res=>{
        this.coords = res;
        var contentString =
        `<b><ul style="padding:0;margin:0;list-style:none">
        <li>${this.com_Address}</li>
        <li>${this.com_Name}</li>
        <li>${this.com_type}</li>
      </ul> </b>`;



      loader.load().then(()=>{
        const maps = new google.maps.Map(this.map.nativeElement,{
          center:this.coords,
          zoom:15,
          disableDefaultUI: true,
          styles:mapStyle
        })
        const marker = new google.maps.Marker({
          position:this.coords,
          map:maps,
          title:this.com_Name.toString()
        })

        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
        })

        marker.addListener("click",()=>{
          infoWindow.open({
            anchor: marker,
            map:maps,
            shouldFocus: false,
          });
        })

      })
      })



    })


  }

//   contactsPage() {
//     this.router.navigateByUrl('/communityprofile/contacts');
//   }

  sendKnock(user: any) {
    var data = {
      basic_details_id: user.basic_details_id
    }

    this.knockService.sendKnock(data).subscribe(res => {
      console.log(res);
      if (res == "Request already sent. Please wait for response.") {
        this.message = res;
        this.showToast = true;
      }
      else {
        this.message = "Knock sent to user " + user.alias;
        this.showToast = true;
      }
    }, (err) => {
      if (err.error = "Already connected") {
        this.message = err.error;
        this.showToast = true;

      }
    });

  }

  viewProfile(user: any) {
    this.router.navigateByUrl("/viewprofile/" + user.basic_details_id );
  }


  closeToast() {
    this.showToast = false;
  }


//   communitySurvey() {

//     this.router.navigateByUrl('/communityprofile/communitysurvey');

//   }

  //---------- Open Invite Friend Modal from NGB

  closeResult = '';

  open(content: any,person:any) {
    if(person=='neighbour'){

    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }




}
