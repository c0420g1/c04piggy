import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly APIgetAllNotification = 'http://localhost:8080/getAllNotification';
  private readonly APIaddEditNotification = 'http://localhost:8080/addEditNotification';
  private readonly APIdeleteNotification = 'http://localhost:8080/deleteNotification';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.APIgetAllNotification);
  }

  addEdit(nf: Notification): Observable<void>{
    return this.http.post<void>(this.APIaddEditNotification, nf);
  }

  delete(ids: number[]): Observable<number>{
    return this.http.post<number>(this.APIdeleteNotification, ids);
  }
}
