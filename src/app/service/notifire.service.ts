import { Injectable } from '@angular/core';
import {AngularFireList, AngularFireDatabase} from '@angular/fire/database';
@Injectable({
  providedIn: 'root'
})
export class NotifireService {

  notificationList: AngularFireList<any>;
  constructor(private  firebase: AngularFireDatabase) { }
  getImageDetailList(){
    this.notificationList = this.firebase.list('notifications');
    return this.notificationList;
  }
  insertImageDetails(notification){
    this.notificationList = this.firebase.list('notifications');
    this.notificationList.push(notification);
  }
}
