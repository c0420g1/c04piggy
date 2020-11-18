import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Employee} from '../model/Employee';
import {Stock} from '../model/Stock';
import {Global} from '../model/Global';
import { Acc } from '../model/Acc';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly API_URL_EMPLOYEE = Global.host + 'employee';

  constructor(private  http: HttpClient) { }

  public getAllEmployee(): Observable<Employee[]>{
    return this.http.get<Employee[]>(this.API_URL_EMPLOYEE);
  }

}
