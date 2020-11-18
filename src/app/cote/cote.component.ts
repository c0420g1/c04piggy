
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
import {HistoryExportService} from '../service/history-export.service';
import {HistoryExport} from '../model/HistoryExport';
import {DatePipe} from '@angular/common';
import {Stock} from '../model/Stock';
import { PigDTONew } from '../model/PigDTONew';
import {Global} from '../model/Global';

@Component({
    selector: 'app-cote',
    templateUrl: './cote.component.html',
    styleUrls: ['./cote.component.css']
})
export class CoteComponent implements OnInit {
  variableFind = '';
  coteList: CoteDTO[] = [];
  employeeList: Employee[] = [];
  herdList: Herd[] = [];
  message: string;
  pigList: Pig[] = [];
  coteCodeList: string[] = [];
  pigListDTO: PigDTONew[] = [];
  coteEdit = new Cote();
  coteTemp = new Cote();
  check: boolean;


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
  startPage: number;
  endPage: number;
  listPage: number[];

    //phần dưới này là các biến của hiếu
    historyExport: FormGroup;
    ids: string = '';
    currentDate: string;
    pigsListSoldIds = '';
    idSoldPig: number[] = [];
    idPig: number;

  constructor(private coteService: CoteService,
              private fb: FormBuilder,
              private employeeService: EmployeeService,
              private pigService: PigService,
    private historyService: HistoryExportService,
                private datePipe: DatePipe) {
    this.coteEdit.employee = new Employee();
    this.coteEdit.herd = new Herd();
  }

  ngOnInit(): void {
      const dateCur = new Date();
      this.currentDate = this.datePipe.transform(dateCur, 'yyyy-MM-dd');
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
      this.setPage(this.currentPage);
    });

    this.employeeService.getAllEmployee().subscribe((employees) => {
      this.employeeList = employees;
    });
    this.pigService.getListHerd().subscribe((herds) => {
      this.herdList = herds;
    });
    this.coteService.getCoteCode().subscribe((data) => {
      this.coteCodeList = data;
    });

    this.addNewCoteForm = this.fb.group({
      id: [''],
      description: [''],
      isDeleted: [''],
      code: ['', Validators.required],
      dateGroup: this.fb.group({
        importDate: ['', [Validators.required, importDayCheckValidator]],
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
    });
      this.historyExport = this.fb.group({
          id: [''],
          isDeleted: [''],
          description: [''],
          type: [''],
          quantity: [''],
          unit: [''],
          company: ['', Validators.required],
          receivedEmployeeId: [''],
          exportDate: [this.currentDate],
          stock: Stock,
          cote: Cote,
          employee: Employee
      });
  }

    search() {
        this.currentPage = 1;
        this.ngOnInit();
    }

    prePage(): void {
        if (this.currentPage >= 2) {
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
        console.log(this.currentPage);
        this.ngOnInit();
    }
    
    // creator Hieu
    soldPig() {
        this.historyService.soldPigs(this.pigsListSoldIds, this.historyExport.value).subscribe(
            () => {
            }, error => console.log('error export!')
        );
        this.ngOnInit();
    }

    addIdPigSold(id: number) {
        this.idPig = id;
    }

    getAllIdPigs(pigs: Pig[]) {
        this.idSoldPig = [];
        this.pigsListSoldIds = '';

        for (let i = 0; i < pigs.length; i++) {
            this.idSoldPig.push(pigs[i].id);
        }
        for (let i = 0; i < this.idSoldPig.length; i++) {
            this.pigsListSoldIds += this.idSoldPig[i] + ',';
        }
    }

    sold1Pig() {
        this.historyService.soldPigs(""+this.idPig+"", this.historyExport.value).subscribe(
            () => {
                console.log(this.historyExport.value);
            }, error => console.log('error export!')
        );
        this.ngOnInit();
    }


  setPage(currentPage) {
    const totalPage = Math.ceil(this.totalEntities / Global.pageSize);
    const maxPage = 5;
    if (currentPage < 1) {
      this.currentPage = 1;
    } else if (currentPage > totalPage) {
      this.currentPage = totalPage;
    }
    let startPage: number;
    let endPage: number;
    if (totalPage <= maxPage) {
      startPage = 1;
      endPage = totalPage;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPage / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPage / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = maxPage;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPage) {
        // current page near the end
        startPage = totalPage - maxPage + 1;
        endPage = totalPage;
      } else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }
    this.listPage = Array.from(Array(endPage + 1 - startPage).keys()).map(
        (i) => startPage + i
    );
    this.currentPage = currentPage;
    this.startPage = this.listPage[0];
    this.endPage = this.listPage[this.listPage.length - 1];
    console.log(this.endPage);
  }

  goToPage() {
    this.currentPage = this.jumpPage;
    this.ngOnInit();
  }
  changePage(currentPage) {
    this.currentPage = currentPage;
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

    this.coteService.addNewCote(this.coteTemp).subscribe(() => this.ngOnInit());
    document.getElementById('add').click();
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
      this.editCoteForm.patchValue({herd: data.herd.name});
      this.editCoteForm.get('dateGroup').get('importDate').patchValue(this.formatDate(new Date(data.importDate)));
      if (data.exportDate != null){
        this.editCoteForm.get('dateGroup').get('exportDate').patchValue(this.formatDate(new Date(data.exportDate)));
      } else {
        this.editCoteForm.get('dateGroup').get('exportDate').patchValue(this.formatDate(new Date('')));
      }
      this.coteService.getListPig(data.herd.name).subscribe((data1) => {
        if (data1.length === 0){
          this.check = true;
        } else {
          this.check = false;
        }
      });
    });
  }


  soldAllPig(pigList: PigDTONew[]) {
    for (const pig of this.pigListDTO){
      this.pigService.soldPig(pig.pigId).subscribe();
    }
    document.getElementById('informHerd').click();
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
    this.coteService.addNewCote(this.coteEdit).subscribe(() => this.ngOnInit());
    document.getElementById('edit').click();
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) { month = '0' + month; }
    if (day.length < 2) { day = '0' + day; }
    return [year, month, day].join('-');
  }
}






// Customer Validator ImportDay

function importDayCheckValidator(control: AbstractControl) {
  const currentDay = new Date();
  const day = new Date(control.value);
  // tslint:disable-next-line:max-line-length
  if (day >= currentDay || (day.getFullYear() === day.getFullYear() && day.getMonth() === currentDay.getMonth() && day.getDay() === currentDay.getDay()) ){
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
  const check = Math.round(Math.abs((day - dayCheck) / (24 * 60 * 60 * 1000)));
  // Điều kiện sai để trả về valid cho form.
  if (day != null) {
    if (check <= 112 || day < new Date()) {
      return {
        exportDay: true
      };
    }
  }
  return null;
}


