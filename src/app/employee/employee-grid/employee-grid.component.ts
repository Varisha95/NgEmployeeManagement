import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee-detail/employee';
import { HttpClientService } from '../../service/http-client/http-client.service';

@Component({
  selector: 'app-employee-grid',
  templateUrl: './employee-grid.component.html',
  styleUrls: ['./employee-grid.component.css']
})
export class EmployeeGridComponent implements OnInit {

  employees: Employee[]
  constructor(private httpService: HttpClientService, private router: Router) { }

  ngOnInit() {
    this.getAllEmployeesList();
  }

  goToEmployeeDetail(employee: Employee) {

    debugger
    this.router.navigate(['/home/addemployee', employee._id])
  }

  getAllEmployeesList(){
    this.httpService.getEmployees().subscribe(response => {
      this.employees = response;
    })
  }
  deleteEmployee(employee: Employee) {

    this.httpService.deleteEmployee(employee).subscribe(response => {
      this.getAllEmployeesList();
    })
  }
}
