import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly API_URL = 'http://localhost/notification';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.API_URL);
  }
}
