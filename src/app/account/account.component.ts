import { Component, OnInit } from '@angular/core';
import { AccountService } from '../service/account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  columnHeader = { 'id': 'ID', 'code': 'Code' , 'username':'Username','password':'Password',
    'name': 'Name', 'birthday': 'Birthday', 'email': 'Email', 'gender': 'Gender', 'cardId': 'Card ID',
    'nameRole': 'Role Name','action': 'Action'};
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }

}
