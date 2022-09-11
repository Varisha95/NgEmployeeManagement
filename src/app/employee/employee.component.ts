import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../service/http-client/http-client.service';
import { Employee } from './employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];
employee={empId:1, name:"Varisha", designation:"Software Developer", salary: 46576678}
  
  constructor(private httpClientService:HttpClientService) { }

  ngOnInit() {
    debugger
    this.httpClientService.getEmployees().subscribe(
      response =>{alert(response);}
     );


  }
add(){
  debugger
this.httpClientService.createEmployee(this.employee).subscribe(
  response=>{
console.log(response);
  }
)
}

  deleteEmployee(employee: Employee): void {
    this.httpClientService.deleteEmployee(employee)
      .subscribe( data => {
        this.employees = this.employees.filter(u => u !== employee);
      })
  };
}
