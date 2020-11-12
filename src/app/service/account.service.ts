import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly APIgetAllAccount = 'http://localhost:8080/employees/1';
  constructor(private http: HttpClient) { }
  getAll(): Observable<Account[]>{
    return this.http.get<Account[]>(this.APIgetAllAccount);
  }
}
