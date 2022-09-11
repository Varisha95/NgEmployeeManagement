import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employee } from '../employee';
import { HttpClientService } from '../../service/http-client/http-client.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {


  employeeForm: FormGroup;
  submitted:boolean=false;
  employee: Employee;
  currentRouter: string;
  urlEmpId: string;
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
    this.urlEmpId = this.activatedRoute.snapshot.paramMap.get("id");
    if (this.urlEmpId) {
      this.isUpdate = true;
      this.buttonName = 'Update'
      this.httpClientService.getEmployee(this.urlEmpId).subscribe(employee => {
        this.employee = employee;
        this.initializeForm();
      })
    }
  }

  initializeForm() {
    this.employeeForm = this.fb.group({
      _id: [this.employee._id || ''],
      empId: [this.employee.empId|| '', Validators.required],
      name: [this.employee.name || '', Validators.required],
      designation: [this.employee.designation || '', Validators.required],
      salary: [this.employee.salary || '', Validators.required]
    });
  }

  onSubmit() {
    debugger
    this.submitted=true;
    if (this.employeeForm.invalid) {
      return;
    }
    this.employee = this.employeeForm.value;
    if (this.isUpdate) {
      let _id = this.employee._id;
      delete this.employee._id;
      this.httpClientService.updateEmployee(_id, this.employee).subscribe(response => {
        this.toastr.success('Employee Updated Successfully', 'Updated', {
          timeOut: 1000,
        });
      })
    }
    else {
      delete this.employee._id;
      this.httpClientService.createEmployee(this.employee).subscribe(response => {
        
        // this.toastr.showToast('Title', 'Employee Added Successfully','success');
        this.toastr.success('Employee Added Successfully', 'Added', {
          timeOut: 500,
        });
        setTimeout(() => {
          this.router.navigate(['/home/viewemployee'])
        }, 1000);
        
      })
    }
  }

  get f() { return this.employeeForm.controls; }
}
