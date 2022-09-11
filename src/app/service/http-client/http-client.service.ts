import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../employee/employee';

export const baseUrl = "https://crudcrud.com/api";
export const uniqueIdentifier = "/fcd682b675bd40c89076c4c586c22d77";
const resource = "/employees"
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient) { }

  getEmployee(empId: string) {
    return this.httpClient.get<Employee>(baseUrl + uniqueIdentifier + resource +'/'+ empId);
  }

  getEmployees() {
    debugger
    console.log("test call");
    return this.httpClient.get<Employee[]>(baseUrl + uniqueIdentifier + resource);
  }

  public deleteEmployee(employee) {
    return this.httpClient.delete<Employee>(baseUrl + uniqueIdentifier + resource +'/'+ employee._id);
  }

  public createEmployee(employee) {
    return this.httpClient.post<Employee>(baseUrl + uniqueIdentifier + resource, employee);
  }

  public updateEmployee(_id,employee) {
    return this.httpClient.put<Employee>(baseUrl + uniqueIdentifier + resource +'/'+_id, employee);
  }
}
