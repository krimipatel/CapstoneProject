import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InviteUserService } from 'src/app/services/ResidentialUser/inviteUser/invite-user.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {

  @Input() communityAddress:any = '';

  constructor(private inviteUserService: InviteUserService) { }

  ngOnInit(): void {
  }

  inviteForm = new FormGroup({
    email: new FormControl('',[Validators.email,Validators.required]),
    community_address : new FormControl(false)
  });

  message : any = '';

  invite()
  {
    var data;

    if (this.inviteForm.controls.community_address.value==true) {
      data = {
        email : this.inviteForm.controls.email.value,
        community_address: this.communityAddress
      }
    } else{
      data = {
        email : this.inviteForm.controls.email.value,
        community_address: ""
      }
    }

    console.log(data);
    
    this.message ="The invite will be sent shortly."
    this.inviteUserService.invite(data).subscribe(res=>{
      if(res){
        this.message=res;
      }
    });
  }




}
