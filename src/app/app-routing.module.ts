import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { AuthGuard } from './authentication/guards/auth.guard';
import { SignupComponent } from './authentication/signup/signup.component';
import { EmployeeGridComponent } from './employee/employee-grid/employee-grid.component';
import { EmployeeDetailComponent } from './employee/employee-detail/employee-detail.component';
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
      path: 'addemployee/:id', component: EmployeeDetailComponent
    }, {
      path: 'addemployee', component: EmployeeDetailComponent
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
