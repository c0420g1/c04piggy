import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotifireService} from '../service/notifire.service';
import {Notifire} from '../model/Notifire';
import {AccountService} from '../service/account.service';
import {TokenStorageService} from '../service/token-storage.service';
import {Global} from '../model/Global';

@Component({
  selector: 'app-notifire',
  templateUrl: './notifire.component.html',
  styleUrls: ['./notifire.component.css']
})
export class NotifireComponent implements OnInit {
  notificationForm: FormGroup;
  notificationList: any[];
  accountList = [];
  info: any;
  notiFire: Notifire;
  globalNoti = Global.noteficationGlobal;
  constructor( private fb: FormBuilder, private service: NotifireService,
               private token: TokenStorageService, public accountService: AccountService) { }
  ngOnInit(): void {
    this.accountService.getData(-1, ' ').subscribe(account => {
      this.accountList = account;
      console.log(this.accountList);
    });
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername()
    };
    this.service.getImageDetailList().snapshotChanges().subscribe(
        list => {
          this.notificationList = list.map(item => {
              return {
                id: item.payload.key,
                ...item.payload.val() as object
              } as any;
          });
          console.log(this.notificationList);
        }
    );
    this.notificationForm = this.fb.group({
      to: ['', [Validators.required]],
      from: [this.info.username],
      title:  ['', [Validators.required]],
      content:  ['', [Validators.required]],
      count: [0]
    });
  }

  sendMessage() {
    this.notiFire = this.notificationForm.value;
    console.log(this.notiFire);
    this.service.insertImageDetails(this.notiFire);
  }
}
