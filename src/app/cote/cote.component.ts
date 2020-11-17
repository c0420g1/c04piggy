import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, AbstractControl} from '@angular/forms';

import {Cote} from '../model/Cote';
import {CoteService} from '../service/cote.service';
import {CoteDTO} from '../model/CoteDTO';
import {Herd} from '../model/Herd';
import {EmployeeService} from '../service/employee.service';
import {Employee} from '../model/Employee';
import {PigService} from '../service/pig.service';
import {Pig} from '../model/Pig';
import { PigDTONew } from '../model/PigDTONew';

@Component({
  selector: 'app-cote',
  templateUrl: './cote.component.html',
  styleUrls: ['./cote.component.css']
})
export class CoteComponent implements OnInit {
  variableFind = '';
  coteList: CoteDTO[] = [];
  employeeList: Employee[] = [];
  herdList:  Herd[] = [];
  message: string;
  pigList: Pig[] = [];
  pigListDTO: PigDTONew[] = [];
  coteEdit = new Cote();
  coteTemp = new Cote();



  // Pagination
  currentPage = 1;
  entityNumber: number;
  totalEntities: number;
  totalPage: number;
  jumpPage: number;
  typeList = ['Get Meat', 'Reproduction'];
  // Pagination
  addNewCoteForm: FormGroup;
  editCoteForm: FormGroup;

  constructor(private coteService: CoteService,
              private fb: FormBuilder,
              private employeeService: EmployeeService,
              private pigService: PigService) {
    this.coteEdit.employee = new Employee();
    this.coteEdit.herd = new Herd();
  }

  ngOnInit(): void {
    this.coteService.getListCote(this.variableFind).subscribe((data) => {
      this.totalEntities = data.length;
      this.totalPage = this.totalEntities / 10;
    });

    this.coteService.getAllCote(this.currentPage, this.variableFind).subscribe((data) => {
      if (data.length === 0) {
        this.message = 'Not found any cote, try again!';
      } else {
        this.message = '';
      }
      this.entityNumber = data.length;
      this.coteList = data;
    });

    this.employeeService.getAllEmployee().subscribe((employees) =>{
      this.employeeList = employees;
    });
    this.pigService.getListHerd().subscribe((herds) =>{
      this.herdList = herds;
    });

    this.addNewCoteForm = this.fb.group({
      id: [''],
      description: [''],
      isDeleted: [''],
      code: ['', Validators.required],
      dateGroup: this.fb.group({
        importDate: ['',[Validators.required,importDayCheckValidator]],
        exportDate: ['']
      }, {validators: exportDayCheckValidator}),

      quantity: [''],
      type: [''],
      employee: Employee,
      herd: Herd,
    });
    this.editCoteForm = this.fb.group({
      id: [''],
      description: [''],
      isDeleted: [''],
      code: ['', Validators.required],
      dateGroup: this.fb.group({
        importDate: [''],
        exportDate: [''],
      }, {validators: exportDayCheckValidator}),

      quantity: [''],
      type: [''],
      employee: Employee,
      herd: Herd,
    })
  }

  search() {
    this.currentPage =1;
    this.ngOnInit();
  }

  prePage(): void {
    if (this.currentPage >= 2 ){
      this.currentPage--;
      this.jumpPage = this.currentPage;
    }
    this.ngOnInit();
  }

  nexPage(): void {
    if (this.currentPage < this.totalEntities / 10) {
      this.currentPage++;
      this.jumpPage = this.currentPage;
    }
    this.ngOnInit();
  }

  goToPage() {
    this.currentPage = this.jumpPage;
    this.ngOnInit();
  }

  AddNewCote(form: FormGroup) {

    this.coteTemp.herd = form.get('herd').value;
    this.coteTemp.employee = form.get('employee').value;
    this.coteTemp.type = form.get('type').value;
    this.coteTemp.code = form.get('code').value;
    this.coteTemp.quantity = form.get('quantity').value;
    this.coteTemp.isDeleted = form.get('isDeleted').value;
    this.coteTemp.description = form.get('description').value;
    this.coteTemp.importDate = new Date(form.get('dateGroup').get('importDate').value);
    this.coteTemp.exportDate = new Date(form.get('dateGroup').get('exportDate').value);

    this.coteService.addNewCote(this.coteTemp).subscribe(()=> this.ngOnInit());
    document.getElementById("add").click();
  }

  getInfoPig(cote: CoteDTO) {
    this.coteService.getStatusPig(cote.herdName).subscribe((data) => this.pigListDTO = data);

  }

  getInfo(cote: CoteDTO) {
    this.coteService.getCoteInform(cote.id).subscribe((data) => {
      this.coteEdit = data;
      if (data.exportDate == null){
        this.coteEdit.exportDate = null;
      }
      this.editCoteForm.patchValue(data);
      this.editCoteForm.get('dateGroup').get('importDate').patchValue(this.formatDate(new Date(data.importDate)));
      if (data.exportDate != null){
        this.editCoteForm.get('dateGroup').get('exportDate').patchValue(this.formatDate(new Date(data.exportDate)));
      } else {
        this.editCoteForm.get('dateGroup').get('exportDate').patchValue(this.formatDate(new Date('')));
      }
    });
  }
  soldPig(pigId: number) {
    this.pigService.soldPig(pigId).subscribe();
  }

  soldAllPig(pigList: PigDTONew[]) {
    for (let pig of this.pigListDTO){
      this.pigService.soldPig(pig.pigId).subscribe();
    }
    document.getElementById("informHerd").click();
    this.ngOnInit();
  }


  EditCote(form: FormGroup) {
    this.coteEdit.herd = form.get('herd').value;
    this.coteEdit.employee = form.get('employee').value;
    this.coteEdit.type = form.get('type').value;
    this.coteEdit.code = form.get('code').value;
    this.coteEdit.quantity = form.get('quantity').value;
    this.coteEdit.isDeleted = form.get('isDeleted').value;
    this.coteEdit.description = form.get('description').value;
    this.coteEdit.importDate = new Date(form.get('dateGroup').get('importDate').value);
    this.coteEdit.exportDate = new Date(form.get('dateGroup').get('exportDate').value);
    this.coteService.addNewCote(this.coteEdit).subscribe(()=> this.ngOnInit());
    document.getElementById("edit").click();
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
}

// Customer Validator ImportDay

function importDayCheckValidator(control: AbstractControl) {
  const currentDay = new Date();
  const day = new Date(control.value);
  if (day >= currentDay || (day.getFullYear() == day.getFullYear() && day.getMonth() == currentDay.getMonth() && day.getDay() == currentDay.getDay()) ){
    return null;
  }
  return {
    importDay: true
  };
}

function exportDayCheckValidator(control: AbstractControl) {
  const day = new Date(control.value.exportDate);
  const dayCheck = new Date(control.value.importDate);
  // @ts-ignore
  const check = Math.round(Math.abs((day- dayCheck)/(24*60*60*1000)));
  // Điều kiện sai để trả về valid cho form.
  if (day != null) {
    if (check <= 112 || day < new Date()) {
      return {
        exportDay: true
      }
    }
  }
  return null;
}


