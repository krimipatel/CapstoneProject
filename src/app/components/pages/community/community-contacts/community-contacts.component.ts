import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { CommunityContactsService } from 'src/app/services/ResidentialUser/communityContacts/community-contacts.service';

class CustomValidators {
  static haveEmailOrPhone (control: AbstractControl): ValidationErrors |null{
    const phone = control.get('phone')!.value;
    const email = control.get('email')!.value;

    if(phone=="" && email ==""){
      return {noEmailNoPhone:true};
    } else {
      return null;
    }
  }
}

@Component({
  selector: 'app-community-contacts',
  templateUrl: './community-contacts.component.html',
  styleUrls: ['./community-contacts.component.css']
})
export class CommunityContactsComponent implements OnInit {

  ischecked:boolean=false;
  contacts:any = [];

  // ======= below list is for test ==============
  contactsFromBack:any[]=[
    {
      id:'240985382936',
      name:'Ruchit1',
      position:'manager',
      email:'rpate613@my.centennialcollege.ca',
      phone:'416-388-XXXX',
      upvotes:10,
      downvotes:2,
      vote:'up'
    },
    {
      id:'230945723',
      name:'Ruchit2',
      position:'manager',
      email:'rpate613@my.centennialcollege.ca',
      phone:'416-388-XXXX',
      upvotes:12,
      downvotes:2,
      vote:'down'
    },
    {
      id:'249813644',
      name:'Ruchit3',
      position:'manager',
      email:'rpate613@my.centennialcollege.ca',
      phone:'416-388-XXXX',
      upvotes:15,
      downvotes:3,
      vote:'no'
    },
    {
      id:'233482364',
      name:'Ruchit4',
      position:'manager',
      email:'rpate613@my.centennialcollege.ca',
      phone:'416-388-XXXX',
      upvotes:16,
      downvotes:4,
      vote:'up'
    }
  ]

  contactInfoForm:FormGroup = new FormGroup({
    'name':new FormControl('', [Validators.required]),
    'position': new FormControl('', [Validators.required]),
    'email':new FormControl('', [Validators.email]),
    'phone':new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.minLength(10)])
  },{
    validators:CustomValidators.haveEmailOrPhone
  });

  constructor(private contactService:CommunityContactsService) { }

  ngOnInit(): void {
    this.contactService.getContacts().subscribe(res=>{
      console.log(res);
      if(res!=null){
        this.contacts = res;
      }
    });
  }

  openToggel(){
    this.ischecked = !this.ischecked;
  }

  submitContact(){
    console.log(this.contactInfoForm.value)
  }

  closeToggle(){
    this.ischecked = !this.ischecked;
  }

  upvote(id:string){

    for (let index = 0; index < this.contactsFromBack.length; index++) {
      if(this.contactsFromBack[index].id==id){
        if (this.contactsFromBack[index].vote=='up') {
          console.log("contact is already upvoted!! No change!!");
          return;
        }
        if (this.contactsFromBack[index].vote=='down') {
          this.contactsFromBack[index].downvotes = this.contactsFromBack[index].downvotes-1;
        }
        this.contactsFromBack[index].upvotes = this.contactsFromBack[index].upvotes+1;
        this.contactsFromBack[index].vote = 'up';
        console.log("contact upvoted!!");
      }
    }
  }

  downvote(id:string){
    for (let index = 0; index < this.contactsFromBack.length; index++) {
      if(this.contactsFromBack[index].id==id){
        if (this.contactsFromBack[index].vote=='down') {
          console.log("contact is already downvoted!! No change!!");
          return;
        }
        if (this.contactsFromBack[index].vote=='up') {
          this.contactsFromBack[index].upvotes = this.contactsFromBack[index].upvotes-1;
        }
        this.contactsFromBack[index].downvotes = this.contactsFromBack[index].downvotes+1;
        console.log("contact downvoted!!");
        this.contactsFromBack[index].vote = 'down';
      }
    }
  }

}
