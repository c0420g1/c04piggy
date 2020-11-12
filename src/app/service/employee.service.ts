import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly API_URL_EMPLOYEE = 'http://localhost:8080/employee';
  constructor(private  http: HttpClient) { }

  public getAllEmployeeDTO(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.API_URL_EMPLOYEE);
  }
}
