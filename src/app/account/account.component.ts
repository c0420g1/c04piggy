import {Component, Input, OnInit} from '@angular/core';
import { AccountService } from '../service/account.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Account} from '../model/Account';
import {Acc} from '../model/Acc';
import {EmployeeService} from '../service/employee.service';
import {Employee} from '../model/Employee';
import { Role } from '../model/Role';
import { AccountRole } from '../model/AccountRole';
import {ToastrService} from 'ngx-toastr';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  columnHeader = { code: 'Code' , username: 'Username', name: 'Name', birthday: 'Birthday', email: 'Email', cardId: 'Card ID',
    nameRole: 'Role Name', action: 'Action'};
  tableName = 'Staff Manager';
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
  roleForm: FormGroup;
  employee: Employee;
  roleList: Role[];
  accountLast: Acc;
  roleSelect: Role;
  accountList = [];
  pass: string;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router,
              private accountService: AccountService, private employeeService: EmployeeService, private  toast: ToastrService) {}

  ngOnInit(): void {
    this.accountService.getData(-1, ' ').subscribe(account => {
        this.accountList = account;
        console.log(this.accountList);
    });
    this.accountService.getAllRole().subscribe((roles) => {
      this.roleList = roles;
      this.roleSelect = roles[0];
    });
    this.accountForm = this.fb.group({
      id: [this.data.id],
      isDeleted: [0],
      description: [this.data.description],
      username:  [this.data.username, [Validators.required]],
      password:  [this.data.password, [Validators.required]],
    });

    this.roleForm = this.fb.group({
      id: [],
      isDeleted: [0],
      description: [''],
      role:  [this.roleSelect],
      account: [this.accountLast]
    });

    this.employeeForm = this.fb.group({
      id: [],
      isDeleted: [0],
      description: [''],
      code:  [this.data.code, [Validators.required, Validators.pattern('NV[0-9]+')]],
      name:  [this.data.name, [Validators.required]],
      birthday:  [this.data.birthday, [Validators.required, dateValidator]],
      email:  [this.data.email, [Validators.required, Validators.pattern('[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}')]],
      cardId:  [this.data.cardId, [Validators.required, Validators.pattern('[\\d]{3,}(-)[\\d]{3,}(-)[\\d]{3,}')]],
      gender:  ['1'],
      account: [this.accountLast]
    });
  }
  call(value){
      for (const role of this.roleList){
      if (value == role.id){
        this.roleSelect = role;
      }
    }
  }
    refeshComponent(){
        const currentRoute = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
            this.router.navigate([currentRoute]);
        });
    }
  addEditStock(){
    // @ts-ignore

    if (this.accountForm.value.id != null){
      this.employeeForm.value.id = this.accountForm.value.id;
      this.employeeForm.value.account = this.accountForm.value;
      console.log(this.employeeForm.value);
      this.accountService.editEmployee(this.employeeForm.value).subscribe(
          data => {
              this.pass = bcrypt.hashSync(this.accountForm.value.password, 10);
              this.accountForm.value.password = this.pass;
              this.accountService.editAccount(this.accountForm.value).subscribe(
                (data) => {
                  this.accountService.getRolebyId(this.accountForm.value.id).subscribe((role) => {
                    this.roleForm.value.id = role.id;
                    this.roleForm.value.account = this.accountForm.value;
                    this.roleForm.value.role = this.roleSelect;
                    this.accountService.editRoleAccount(this.roleForm.value).subscribe(data => {
                      console.log('hello');
                    });
                  });
                });
          }
      );

    }else if (this.accountForm.value.id == null){
        this.pass = bcrypt.hashSync(this.accountForm.value.password, 10);
        this.accountForm.value.password = this.pass;
        this.accountService.addAccount(this.accountForm.value).subscribe(
          (data) => {
              this.accountService.getAccountLast().subscribe(
                  data => {
                    this.accountLast = data;
                    console.log(this.employeeForm.value);
                    this.employeeForm.value.account = this.accountLast;
                    console.log(this.employeeForm.value);
                    this.roleForm.value.role = this.roleSelect;
                    this.roleForm.value.account = this.accountLast;
                    console.log(this.roleForm.value);
                    this.accountService.addRoleAccount(this.roleForm.value).subscribe(
                        data => {
                          console.log('Hello');
                        }
                    );
                    this.accountService.addEmployee(this.employeeForm.value).subscribe(
                        data => {
                          console.log('Good luck');
                        }
                    );
                  }
              );
          });
    }
    this.activeModal.close();
    this.refeshComponent();
    this.toast.success('Add Successful', 'ABC Accounht');
  }
    // usernameValidator(){
    //
    //   for (const account of this.accountList){
    //     if (account.username === this.accountForm.value.username){
    //         console.log('true');
    //         this.testAccount = true;
    //     }else if (account.username !== this.accountForm.value.username){
    //         console.log('false');
    //         this.testAccount = false;
    //     }
    // }
    // }
}

function dateValidator(formControl: FormControl) {
    if (formControl.value == undefined) {
        return null;
    }
    let date1: string[];
    date1 = formControl.value.split('-');
    const o_date = new Intl.DateTimeFormat;
    const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
    const m_date = o_date.formatToParts().reduce(f_date, {});
    const dateNumber = (parseInt(date1[0]) * 365) + (parseInt(date1[1]) * 30) + (parseInt(date1[2]));
    const dateNumberNow = (parseInt(m_date.year) * 365) + (parseInt(m_date.month) * 30) + (parseInt(m_date.day));
    if (dateNumber > dateNumberNow) {
        return {checkDate: true};
    }
    return null;
}

