import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from '../model/Global';
// import { GlobalUtil } from '../shared/GlobalUtil';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly APIgetAllNotification = Global.host + 'getAllNotification';
  private readonly APIaddEditNotification = Global.host + 'addEditNotification';
  private readonly APIdeleteNotification = Global.host + 'deleteNotification';
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
