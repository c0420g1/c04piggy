import { Component, OnInit } from '@angular/core';
import { PigAssociateStatus } from '../model/PigAssociateStatus';
import {Pig} from '../model/Pig';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PigService} from '../service/pig.service';
import {PigDTO} from '../model/PigDTO';
import {Herd} from '../model/Herd';
import {PigStatus} from '../model/PigStatus';
import { Feed } from '../model/Feed';
import {FeedService} from '../service/feed.service';
import { StatusService } from '../service/status.service';
import * as $ from 'jquery';
import {DeleteModal} from '../table/table.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Cote} from '../model/Cote';
import {CoteService} from '../service/cote.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})
export class PigComponent implements OnInit {
  // List
  message: string;
  pigAssociateStatusList: PigAssociateStatus[] = [];
  pigList: PigDTO[] = [];
  maleList: Pig[] = [];
  femaleList: Pig[] = [];
  pigStatus: PigStatus[] = [];
  feedList: Feed[] = [];
  herdList: Herd[] = [];
  coteList: Cote[] = [];
  pig: Pig = new Pig();
  pigEdit: Pig;

  // Pagination
  currentItems = 0;
  totalItems = 0;
  search = '';
  listPage: number[];
  currentPage = 1;
  totalPage: any;
  startPage: any;
  endPage: any;
  pageSize = 5;

  // Form
  isDeleteAll = false;
  addNewPigForm: FormGroup;
  checkIfPigNewBorn = false;
  addNewPigStatus: FormGroup;
  pigAdd: Pig = new Pig();
  editPigForm: FormGroup;
  private errors: any;
  private filter: string;



  constructor(private pigService: PigService,
              private fb: FormBuilder,
              private fbEdit: FormBuilder,
              private fbStatus: FormBuilder,
              private feedService: FeedService,
              private coteService: CoteService,
              private pigStatusService: StatusService,
              private toastr: ToastrService,
              private modalService: NgbModal) { }

  ngOnInit(): void {

    // get list
    this.coteService.getListCote('').subscribe((cotes) => {
      this.coteList = cotes;
    });

    this.pigService.getListHerd().subscribe((herds) => {
      this.herdList = herds;
    });

    this.feedService.getAll().subscribe((feeds) => {
      this.feedList = feeds;
    });

    this.pigStatusService.getAllStatus().subscribe((status) => {
      this.pigStatus = status;
    });

    this.pigService.maleList(this.filter).subscribe((male) => {
      this.maleList = male;
    });

    this.pigService.femaleList(this.filter).subscribe((female) => {
      this.femaleList = female;
    });

    this.getPigList();

    // add (new import/new born)
    this.addNewPigForm = this.fb.group({
        description: [''],
        code: ['', Validators.required],
      dateGroup: this.fb.group({
          importDate: [''],
          exportDate: [''],
        }, {validators: exportDayCheckValidator}),
        gender: ['', Validators.required],
        spec: ['', Validators.required],
        weight: ['', Validators.required],
        color: [''],
        fatherId: [''],
        motherId: [''],
        cote: Cote,
        feed: Feed,
        herd: Herd,
      });

    this.editPigForm = this.fb.group({
      id: [''],
      description: [''],
      code: ['', Validators.required],
      dateGroup: this.fb.group({
        importDate: [''],
        exportDate: [''],
      }, {validators: exportDayCheckValidator}),
      gender: ['', Validators.required],
      spec: ['', Validators.required],
      weight: ['', Validators.required],
      color: [''],
      fatherId: [''],
      motherId: [''],
      cote: Cote,
      feed: Feed,
      herd: Herd,
    });

    this.addNewPigStatus = this.fbStatus.group({
      description: [''],
      pig: Pig,
      pigStatus: PigStatus,
    });
  }

  searchPig() {
    this.currentPage = 1;
    this.ngOnInit();
  }

  addPig(form: FormGroup) {
    this.pigAdd.description = form.get('description').value;
    this.pigAdd.isDeleted = form.get('isDeleted').value;
    this.pigAdd.code = form.get('code').value;
    this.pigAdd.spec = form.get('spec').value;
    this.pigAdd.weight = form.get('weight').value;
    this.pigAdd.gender = form.get('gender').value;
    this.pigAdd.color = form.get('color').value;
    this.pigAdd.fatherId = form.get('fatherId').value;
    this.pigAdd.motherId = form.get('motherId').value;
    this.pigAdd.feed = form.get('feed').value;
    this.pigAdd.herd = form.get('herd').value;
    this.pigAdd.cote = form.get('cote').value;
    this.pigAdd.importDate = new Date(form.get('dateGroup').get('importDate').value);
    this.pigAdd.exportDate = new Date(form.get('dateGroup').get('exportDate').value);
    this.pigService.addPig(this.pigAdd).subscribe(() => {
      this.getPigList();
      this.toastr.success('', 'Add new successful !');
    });
    document.getElementById('add').click();
    }

  addPigNewBorn() {
    if (this.addNewPigForm.valid) {
      const {value} = this.addNewPigForm;
      this.pigService.addPig(value).subscribe(
          res => console.log(res),
          err => {
            this.errors = err.error.message;
            console.log(this.errors);
          }
      );
    }
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }

  editPig(pig: PigDTO){
    this.pigService.getPig(pig.pigId).subscribe((data) => {
      this.pig = data;
      console.log(this.pig.id);
      this.editPigForm.patchValue(this.pig);
      this.editPigForm.get('dateGroup').get('importDate').patchValue(this.formatDate(new Date(data.importDate)));
      if (data.exportDate != null) {
        this.editPigForm.get('dateGroup').get('exportDate').patchValue(this.formatDate(new Date(data.exportDate)));
      } else {
        this.editPigForm.get('dateGroup').get('exportDate').patchValue(this.formatDate(new Date('')));
      }
    });
  }

  editPigConfirm(form: FormGroup) {
    this.pigEdit = this.editPigForm.value;
    console.log(this.editPigForm.value);
    this.pigEdit.importDate = new Date(form.get('dateGroup').get('importDate').value);
    this.pigEdit.exportDate = new Date(form.get('dateGroup').get('exportDate').value);
    this.pigService.editPig(this.pigEdit).subscribe(() => {
      console.log(this.pig.id);
      this.getPigList();
      this.toastr.success('', 'Edit Successful !');
    });
  }

  onDelete(element) {
    const ids: number[] = [];
    ids.push(element.id);
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.ids = ids;
    modalRef.componentInstance.service = this.pigService;
  }
  isSelectAll() {
    $('table tbody input[type="checkbox"]').prop(
        'checked',
        $('#selectAll').is(':checked')
    );
  }
  checkit() {
    $('#selectAll').prop('checked', false);
  }
  fdelete() {
    const ids: number[] = [];
    const checkbox = $('table tbody input[type="checkbox"]');
    checkbox.each(function(index) {
      if ((checkbox[index] as HTMLInputElement).checked) {
        const t = Number($(this).val());
        ids.push(t);
      }
    });
    // tslint:disable-next-line:triple-equals
    if (ids.length == 0){
      this.toastr.error('Must be check on check box', 'C04piggy');
      // tslint:disable-next-line:triple-equals
    }else if (ids.length != 0) {
      const modalRef = this.modalService.open(DeleteModal);
      modalRef.componentInstance.ids = ids;
      modalRef.componentInstance.service = this.pigService;
    }
  }
  // pagenation
  changePage(currentPage){
    this.currentPage = currentPage;
    this.getPigList();
  }
  setPage(currentPage){
    const totalPage = Math.ceil(this.totalItems / this.pageSize);
    const maxPage = 5;
    if (currentPage < 1){
      this.currentPage = 1;
    }else if (currentPage > totalPage){
      this.currentPage = totalPage;
    }
    // tslint:disable-next-line:one-variable-per-declaration
    let startPage: number, endPage: number;
    if (totalPage <= maxPage){
      startPage = 1;
      endPage = totalPage;
    }else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPage / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPage / 2) - 1;
      if (currentPage <= maxPagesBeforeCurrentPage) {
        // current page near the start
        startPage = 1;
        endPage = maxPage;
      }else if (currentPage + maxPagesAfterCurrentPage >= totalPage) {
        // current page near the end
        startPage = totalPage - maxPage + 1;
        endPage = totalPage;
      }else {
        // current page somewhere in the middle
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }
    this.listPage = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);
    this.currentPage = currentPage;
    this.startPage = this.listPage[0];
    this.endPage = this.listPage[this.listPage.length - 1];
  }

  next(){
    if (this.currentPage < this.listPage.length){
      this.currentPage++;
      this.getPigList();
    }

  }
  previous(){
    if (this.currentPage > 1)  {
      this.currentPage--;
      this.getPigList();
    }
  }

  // Change to new born input form
  onNewBornChange() {
    this.checkIfPigNewBorn = true;
    this.addNewPigForm.reset();
  }

  getMotherPig(id: number){
    const motherPig = this.pigList[id];
    return motherPig;
  }

  getFatherPig(id: number){
    const fatherPig = this.pigList[id];
    return fatherPig;
  }

  private getPigList() {
    this.pigService.search(- 1, this.search).subscribe(data => {
      if (data.length === 0) {
        this.message = 'Không tìm thấy đặt dữ liệu nào!';
      } else {
        this.message = '';
      }
      this.totalItems = data.length;
      this.totalPage = Math.ceil(this.totalItems / this.pageSize);
      // tslint:disable-next-line:no-shadowed-variable
      this.pigService
          // tslint:disable-next-line:no-shadowed-variable
          .search(this.currentPage, this.search).subscribe(data => {
          this.pigList = data;
          this.currentItems = data.length;
          this.setPage(this.currentPage);
      });
    });
  }

}


// Validator Day

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

