import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from '../model/Global';
// import { GlobalUtil } from '../shared/GlobalUtil';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly APIgetNotification = Global.host + 'getNotification/';
  private readonly APIaddEditNotification = Global.host + 'addEditNotification';
  private readonly APIdeleteNotification = Global.host + 'deleteNotification';
  constructor(private http: HttpClient) { }

  getData(pageNum: number, search: string): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.APIgetNotification + pageNum + '?pageSize=' + Global.pageSize + '&search=' + search);
  }

  addEdit(nf: Notification): Observable<void>{
    return this.http.post<void>(this.APIaddEditNotification, nf);
  }

  delete(ids: number[]): Observable<number>{
    return this.http.put<number>(this.APIdeleteNotification, ids);
  }
}
