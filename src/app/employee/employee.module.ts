import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeComponent } from './employee-detail/add-employee.component';
import { EmployeeGridComponent } from './employee-grid/employee-grid.component';

@NgModule({
  declarations: [
    AddEmployeeComponent,
    EmployeeGridComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmployeeModule { }
