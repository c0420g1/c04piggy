import {Component, Input, OnInit} from '@angular/core';
import { AccountService } from '../service/account.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Account} from '../model/Account';
import {Acc} from '../model/Acc';
import {EmployeeService} from '../service/employee.service';
import {Employee} from '../model/Employee';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  columnHeader = { 'id': 'ID', 'code': 'Code' , 'username':'Username','name': 'Name', 'birthday': 'Birthday', 'email': 'Email', 'gender': 'Gender', 'cardId': 'Card ID',
    'nameRole': 'Role Name','action': 'Action'};
  constructor(public accountService: AccountService) { }

  ngOnInit(): void {
  }
  onAddEdit(element, modal) {
    const modalRef = modal.open(AccountModal);
    modalRef.componentInstance.data = element ?? new Acc();
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
  employee: Employee;
  employeeForm: FormGroup;
  accountLast: Acc;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router, private accountService: AccountService,private employeeService: EmployeeService) {}

  ngOnInit(): void {

    this.accountForm = this.fb.group({
      id: [this.data.id],
      isDeleted: [0],
      description: [this.data.description],
      username:  [this.data.username],
      password:  [this.data.password],
    });

    this.employeeForm = this.fb.group({
      id: [],
      isDeleted: [0],
      description: [""],
      code:  [""],
      name:  [""],
      birthday:  [""],
      email:  [""],
      cardId:  [""],
      gender:  [""],
      account: [this.accountLast]
    });
  }
  addEditStock(){
    if (this.accountForm.value.id != null){
      this.accountService.editAccount(this.accountForm.value).subscribe(
          (data)=>
              window.location.reload())
    }else if (this.accountForm.value.id == null){
      this.accountService.addAccount(this.accountForm.value).subscribe(
          (data)=>{
              this.accountService.getAccountLast().subscribe(
                  data => {
                    this.accountLast = data;
                    console.log(this.accountLast);
                    this.ngOnInit();
                    console.log(this.employeeForm.value);
                    this.accountService.addEmployee(this.employeeForm.value).subscribe(
                        data => {

                        }
                    )
                  }
              )
          })
    }
  }
  onSubmit(){}
}
