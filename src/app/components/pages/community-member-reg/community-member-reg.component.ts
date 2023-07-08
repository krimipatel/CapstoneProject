import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommunityMemberRegService } from 'src/app/services/ResidentialUser/communityMemberReg/community-member-reg.service';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-community-member-reg',
  templateUrl: './community-member-reg.component.html',
  styleUrls: ['./community-member-reg.component.css'],
})
export class CommunityMemberRegComponent {
  email!: string;
  password: string = '';
  field3: string = '';
  field4: string = '';
  showPassword = 'password';
  regError: string = '';
  regSuccess: boolean = false;
  loadingClass: string = '';
  communityMemberRegForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private formBuilder: FormBuilder,
    private communityMemberRegService: CommunityMemberRegService
  ) {
    this.communityMemberRegForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      field3: ['', Validators.required],
      field4: ['', Validators.required],
    });
  }

  Register() {
    this.regError = '';
    this.regSuccess = false;
    this.loadingClass = 'waiting';

    if (this.communityMemberRegForm.invalid) {
      if (this.communityMemberRegForm.controls.email.errors?.required) {
        this.regError = 'Email Address is required.';
      } else if (this.communityMemberRegForm.controls.email.errors?.email) {
        this.regError = 'Email Address is invalid.';
      } else {
        this.regError =
          'Please complete all fields marked with an asterisk (*) prior to submission.';
      }
      return;
    }

    const registrationData = {
      email: this.communityMemberRegForm.value.email,
      password: this.communityMemberRegForm.value.password,
      field3: this.communityMemberRegForm.value.field3,
      field4: this.communityMemberRegForm.value.field4,
    };
  
    console.log(registrationData.email, registrationData.password, registrationData.field3,registrationData.field4);
    
    this.communityMemberRegService.register(registrationData).subscribe(
      (response) => {
        this.regSuccess = true;
        // Show success message in a notification or modal component
        alert(
          'Congratulations, you’re on your way to becoming a Community Member! Your request is currently being reviewed, and you’ll receive a status update within 2 business days.'
        );
        
        // Display the second pop-up message
        alert(
          'Once a request has been submitted, it will be added to the queue in the System Administrator dashboard and a ticket will be created and added to Jira Service Desk.'
        );
        

        // Reset the form
        this.communityMemberRegForm.reset();
      },
      
      (error) => {
        this.regError =
          'An error occurred during registration. Please try again.';
      }
    );
  }
  showPasswordClicked() {
    if (this.showPassword === 'text') {
      this.showPassword = 'password';
    } else {
      this.showPassword = 'text';
    }
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
