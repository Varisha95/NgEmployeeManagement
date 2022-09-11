import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  validUser: boolean;
  submitted = false;
toastMsg:string;
isShowToast:boolean=false;
  constructor(private fb: FormBuilder, private authService: AuthenticationService, private router: Router) { }

  ngOnInit() {
    // debugger
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    // debugger
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.validUser = this.authService.authenticateUser(this.loginForm.value);
    if (this.validUser) {
      // this.toastMsg= "Login Successful";
      // this.isShowToast=true;
      // setTimeout(() => {
      //   this.isShowToast=false;
        this.router.navigate(['/', 'home']);
      // }, 1000);
      
    }

    else{
      alert("Invalid Username or Password")
    }
  }

  get f() { return this.loginForm.controls; }
}
