import {Component, Input, OnInit} from '@angular/core';
import { AccountService } from '../service/account.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Account} from '../model/Account';

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
  onAddEdit(element, modal) {
    const modalRef = modal.open(AccountModal);
    modalRef.componentInstance.data = element ?? new Account();
    modalRef.componentInstance.title = element ? 'Edit Account' : 'Add Account';
  }
}
@Component({
  templateUrl: './account-modal.html'
})
export class AccountModal implements OnInit {
  @Input() data;
  @Input() title;
  accountForm: FormGroup;
  employeeForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {

    this.accountForm = this.fb.group({
      username:  [this.data.username],
      password:  [this.data.password],

    });
    this.employeeForm = this.fb.group({
      code: [this.data.code],
      name:  [this.data.name],
      birthday: [this.data.birthday],
      email:  [this.data.email],
      gender:  [this.data.gender],
      cardId:  [this.data.cardId],
      nameRole:  [this.data.nameRole],
      account: []
    });
  }

  onSubmit(){

  }
}
