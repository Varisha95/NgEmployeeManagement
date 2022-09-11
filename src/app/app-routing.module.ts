import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeGridComponent } from './employee-grid/employee-grid.component';
import { EmployeeComponent } from './employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SignupComponent } from './signup/signup.component';
const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent},
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '', component: EmployeeGridComponent
    }, {
      path: 'viewemployee', component: EmployeeGridComponent
    },
    {
      path: 'addemployee/:id', component: AddEmployeeComponent
    }, {
      path: 'addemployee', component: AddEmployeeComponent
    },
    ]
  }
  ,
  {
    path: '**', component: LoginComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }