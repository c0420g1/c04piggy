import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Global} from '../model/Global';
import {StockDTO} from '../model/StockDTO';
import {Stock} from '../model/Stock';
import { Acc } from '../model/Acc';
import {Employee} from '../model/Employee';
import { Role } from '../model/Role';
import { AccountRole } from '../model/AccountRole';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly APIgetAllAccount = Global.host + 'employees/';
  private readonly ADD_EDIT_ACCOUNT_API = Global.host + 'account/';
  private readonly ADD_EDIT_EMPLOYEE_API = Global.host + 'employee/';
  private readonly GET_LAST_ACCOUNT_API = Global.host + 'findlast/';
  private readonly GET_ROLE_API = Global.host + 'role/';
  private readonly ADD_EDIT_ROLE_ACCOUNT = Global.host + 'roleaccount';
  private readonly GET_ROLE_BY_ID = Global.host + 'getRole/';
  private readonly DELETE_ALL_BY_IDS = Global.host + 'deleteEmployee';
  roleaccount
  constructor(private http: HttpClient) { }
  getData(pageNum: number, search: string): Observable<Account[]>{
    return this.http.get<Account[]>(this.APIgetAllAccount + pageNum + '?pageSize=' + Global.pageSize + '&search=' + search);
  }
  public getRolebyId(id: number):Observable<AccountRole>{
    return this.http.get<AccountRole>(this.GET_ROLE_BY_ID+id);
  }
  public getAllRole(): Observable<Role[]>{
    return this.http.get<Role[]>(this.GET_ROLE_API);
  }
  addRoleAccount(roleAccount: AccountRole): Observable<number>{
    return this.http.post<number>(this.ADD_EDIT_ROLE_ACCOUNT, roleAccount);
  }
  editRoleAccount(roleAccount: AccountRole): Observable<number> {
    return this.http.post<number>(this.ADD_EDIT_ROLE_ACCOUNT, roleAccount);
  }
  addAccount(account: Acc): Observable<number>{
    return this.http.post<number>(this.ADD_EDIT_ACCOUNT_API, account);
  }
  editAccount(account: Acc): Observable<number> {
    return this.http.post<number>(this.ADD_EDIT_ACCOUNT_API, account);
  }
  addEmployee(employee: Employee): Observable<number>{
    return this.http.post<number>(this.ADD_EDIT_EMPLOYEE_API, employee);
  }
  editEmployee(employee: Employee): Observable<number> {
    return this.http.post<number>(this.ADD_EDIT_EMPLOYEE_API, employee);
  }
  getAccountLast(): Observable<Acc> {
    return this.http.get<Acc>(this.GET_LAST_ACCOUNT_API);
  }
  delete(ids: number[]): Observable<number>{
    return this.http.put<number>(this.DELETE_ALL_BY_IDS,ids);
  }
}
