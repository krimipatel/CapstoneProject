import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommunityMemberRegService } from 'src/app/services/ResidentialUser/communityMemberReg/community-member-reg.service';

@Component({
  selector: 'app-community-member-reg',
  templateUrl: './community-member-reg.component.html',
  styleUrls: ['./community-member-reg.component.css']
})
export class CommunityMemberRegComponent {
  
    email!: string;
    field2: string = '';
    field3: string = '';
    field4: string = '';
    regError: string = '';
    regSuccess: boolean = false;
    loadingClass: string = '';
    communityMemberRegForm: FormGroup;

    constructor(
      private authService: AuthService, 
      private router: Router,
      private formBuilder: FormBuilder,
      private communityMemberRegService: CommunityMemberRegService) {

        this.communityMemberRegForm = this.formBuilder.group({
          email: [''],
          field2: [''],
          field3: [''],
          field4: ['']
        });

      }

    Register() {

      this.regError = '';
      this.regSuccess = false;
      this.loadingClass = 'waiting';
  
      const registrationData = {
        email: this.communityMemberRegForm.value.email,
        field2: this.communityMemberRegForm.value.field2,
        field3: this.communityMemberRegForm.value.field3,
        field4: this.communityMemberRegForm.value.field4,
      };
  
      console.log(registrationData.email, registrationData.field2, registrationData.field3,registrationData.field4);
      // Call the registration service
      this.communityMemberRegService.register(registrationData)
        .subscribe(
          response => {
            // Display success message
            // alert('Congratulations, you’re on your way to becoming a Community Member! Your request is currently being reviewed, and you’ll receive a status update within 2 business days.');
            // Reset the form
            // this.communityMemberRegForm.reset();
            // Optionally, navigate to a success page or perform other actions
            
            if (response && response.token) {
              this.regSuccess = true;
              alert('Congratulations, you’re on your way to becoming a Community Member! Your request is currently being reviewed, and you’ll receive a status update within 2 business days.');
            } else {
              this.regError = 'Please complete all fields marked with an asterisk (*) prior to submission.';
            }  
            
          },
          error => {
            this.regError = 'Please complete all fields marked with an asterisk (*) prior to submission.';
          }
        );
  }

  cancel() {
    // Navigate back to the homepage
    // this.router.navigateByUrl('https://naborino.com/');
    this.router.navigateByUrl('/');
  }

  logoClicked() {
    this.router.navigateByUrl('/');
  }

}