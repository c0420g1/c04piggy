import { Component, OnInit } from '@angular/core';
import {LoadCssService} from '../load-css.service';
import {TokenStorageService} from '../service/token-storage.service';
import {FormBuilder} from '@angular/forms';
import {NotifireService} from '../service/notifire.service';
import {Router} from '@angular/router';
import {Global} from '../model/Global';
declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  info: any;
  notificationList: any[];
  notiUserList: any[];
  countMail: number;
  constructor(private loadCssService: LoadCssService, private token: TokenStorageService,
              private fb: FormBuilder, private service: NotifireService, private router: Router) { }

  ngOnInit(): void {
    this.loadCssService.loadCss('assets/vendors/bootstrap/dist/css/bootstrap.min.css');
    this.loadCssService.loadCss('assets/build/css/custom.min.css');
    this.loadCssService.loadScript('assets/build/js/custom.min.js');
    this.service.getImageDetailList().snapshotChanges().subscribe(
        list => {
          this.notificationList = list.map(item => {
            return {
              id: item.payload.key,
              ...item.payload.val() as object
            } as any;
          });
          console.log(this.notificationList);
          this.notiUserList = this.notificationList.filter((value, index, array) => {
            return (value.to === this.info.username || value.to === 'all');
          });
          this.countMail = this.notiUserList.length;
        }
    );
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername()
    };
  }
  logout() {
    this.token.signOut();
    window.location.reload();
  }

    replyMessage(user) {
        Global.noteficationGlobal = user;
        window.location.replace('/notifire');
    }
}

