import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Global} from '../model/Global';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly APIgetAllAccount = Global.host + 'employees/1';
  private readonly APIaddEditAccount = Global.host + '/employee';
  constructor(private http: HttpClient) { }
  getAll(): Observable<Account[]>{
    return this.http.get<Account[]>(this.APIgetAllAccount);
  }
  addEdit(ac: Account): Observable<void>{
    return this.http.post<void>(this.APIaddEditAccount, ac);
  }

}
