import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../service/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  validUser: boolean;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService) {

  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      username: ['Varisha Ajaz' || '', Validators.required],
      password: ['1' || '', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.validUser = this.authService.authenticateUser(this.loginForm.value)
    if (this.validUser) {
      this.toastr.success("User logged in successfully!", "Login Successful", {
        timeOut: 1000
      })
      setTimeout(() => {
        this.router.navigate(['/', 'home']);
      }, 800);

    }
    else {
      this.toastr.error("Invalid Username or Password", 'Login Failed', {
        timeOut: 1500
      });
    }
  }

  get f() { return this.loginForm.controls; }
}
