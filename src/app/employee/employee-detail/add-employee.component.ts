import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../employee';
import { HttpClientService } from '../../service/http-client/http-client.service';
import { MyToastrService } from '../../service/ToastrService/toastr.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {


  addEmployeeForm: FormGroup;
  employee: Employee;
  currentRouter: string;
  empId: string;
  isUpdate: boolean = false;
  buttonName: string = 'Create';
  // employee={empId:2, name:"employee2", designation:"Angular Developer", salary: 4608}

  constructor(
    private fb: FormBuilder,
    private httpClientService: HttpClientService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService) { }

  ngOnInit() {

    debugger;
    this.employee = new Object as Employee;
    this.initializeForm();
    this.empId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.empId) {
      this.isUpdate = true;
      this.buttonName = 'Update'
      this.httpClientService.getEmployee(this.empId).subscribe(employee => {
        this.employee = employee;
        this.initializeForm();
      })
    }
  }

  initializeForm() {
    this.addEmployeeForm = this.fb.group({
      _id: [this.employee._id || ''],
      empId: [this.employee.empId || '', Validators.required],
      name: [this.employee.name || '', Validators.required],
      designation: [this.employee.designation || '', Validators.required],
      salary: [this.employee.salary || '', Validators.required]
    });
  }

  onSubmit() {
    debugger
    if (this.addEmployeeForm.invalid) {
      return;
    }
    this.employee = this.addEmployeeForm.value;
    if (this.isUpdate) {
      let _id = this.employee._id;
      delete this.employee._id;
      this.httpClientService.updateEmployee(_id, this.employee).subscribe(response => {

        // this.toastr.showToast('Title', 'Employee Updated Successfully','success');
        this.toastr.success('Employee Updated Successfully', 'Updated', {
          timeOut: 1000,
          positionClass: 'toast-top-right',
        });
      })
    }
    else {
      delete this.employee._id;
      this.httpClientService.createEmployee(this.employee).subscribe(response => {
        
        // this.toastr.showToast('Title', 'Employee Added Successfully','success');
        this.toastr.success('everything is broken', 'Major Error', {
          timeOut: 500,
        });
        setTimeout(() => {
          this.router.navigate(['/home/viewemployee'])
        }, 1000);
        
      })
    }
  }
}
