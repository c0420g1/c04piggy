import {Component, Input, OnInit} from '@angular/core';
import { AccountService } from '../service/account.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

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
  onEditClick(element, modal) {
    const modalRef = modal.open(AccountModal);
    modalRef.componentInstance.data = element;
  }
  ngOnInit(): void {
  }

}
@Component({
  templateUrl: './account-modal.html'
})
export class AccountModal implements OnInit {
  @Input() data;
  @Input() title;
  notificationForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.notificationForm = this.fb.group({
      id: this.data.id,
      title: [this.data.title],
      content: [this.data.content]
    });
  }

  onSubmit(){}
}
