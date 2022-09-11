import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
signupForm:FormGroup
submitted = false;
  constructor(private fb: FormBuilder,private authService: AuthenticationService, private router:Router) { }

  ngOnInit() {
    this.initializeForm();
  }
initializeForm(){
  this.signupForm=this.fb.group({
    username:['',Validators.required],
    password:['',[Validators.required, Validators.minLength(6)]],
    confirmPassword: ['',Validators.required]
  }, {
    validator: this.MustMatch('password', 'confirmPassword')
});
}

onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.signupForm.invalid) {
      return;
  }

  this.authService.registerUser(this.signupForm.value);
  this.router.navigate(['login']);

}


MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ mustMatch: true });
      } else {
          matchingControl.setErrors(null);
      }
  }
}

get f() { return this.signupForm.controls; }
}
