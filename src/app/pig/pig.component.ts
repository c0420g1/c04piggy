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
  editNewPigForm: FormGroup;



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

    this.getPigList();

    // add (new import/new born)
    if (this.checkIfPigNewBorn) {
      this.addNewPigForm = this.fb.group({
        description: [''],
        code: ['', Validators.required],
        importDate: ['', Validators.required],
        exportDate: ['', Validators.required],
        gender: [''],
        spec: [''],
        weight: [''],
        color: [''],
        parentsGroup: this.fb.group({
          fatherId: ['', Validators.required],
          motherId: ['', Validators.required],
        }),
        cote: Cote,
        feed: Feed,
        herd: Herd,
      });
    }else {
      this.addNewPigForm = this.fb.group({
        id: [''],
        description: [''],
        code: ['', Validators.required],
        importDate: ['', [Validators.required]],
        exportDate: ['', Validators.required],
        gender: [''],
        spec: [''],
        weight: [''],
        color: [''],
        feed: Feed,
        herd: Herd,
        cote: Cote,
      });
    }

    this.addNewPigStatus = this.fbStatus.group({
      description: [''],
      pig: Pig,
      pigStatus: PigStatus,
    });

    this.editNewPigForm = this.fbEdit.group({
      id: [''],
      description: [''],
      isDeleted: [''],
      code: ['', Validators.required],
      importDate: ['', [Validators.required]],
      exportDate: ['', Validators.required],
      gender: [''],
      spec: [''],
      weight: [''],
      color: [''],
      fatherId: ['', Validators.required],
      motherId: ['', Validators.required],
      feed: Feed,
      herd: Herd,
      cote: Cote,
    });
  }

  searchPig() {
    this.currentPage = 1;
    this.ngOnInit();
  }

  addPig() {
    if (this.addNewPigForm.valid) {
      const {value} = this.addNewPigForm;
      this.pigService.addPig(value).subscribe(() => this.ngOnInit());
    }
  }

  editPig(pig: PigDTO){
    this.pigService.getPig(pig.pigId).subscribe((data) => {
      this.pig = data;
      console.log(this.pig.id);
      this.editNewPigForm.setValue(this.pig);
    });

  }

  editPigConfirm() {
    this.pigEdit = this.editNewPigForm.value;
    if (this.editNewPigForm.valid) {
      const { value } = this.editNewPigForm;
      const data = {
        ...this.pigEdit,
        ...value
      };
      this.pigService.editPig(data).subscribe(
          next => {
            this.pigEdit[this.pigList.findIndex(e => e.pigId === this.pigEdit.id)] = this.pigEdit;
            this.ngOnInit();
            },
          error => console.log(error)
      );
    }
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
          .search(this.currentPage, this.search).subscribe(data => {
          this.pigList = data;
          this.currentItems = data.length;
          this.setPage(this.currentPage);
      });
    });
  }

}


// Validator Day

// function importDayCheckValidator(control: AbstractControl) {
//   const currentDay = new Date();
//   const day = new Date(control.value);
// tslint:disable-next-line:max-line-length
//   if (day >= currentDay || (day.getFullYear() == day.getFullYear() && day.getMonth() == currentDay.getMonth() && day.getDay() == currentDay.getDay()) ){
//     return null;
//   }
//   return {
//     importDay: true
//   };
// }
//
// function exportDayCheckValidator(control: AbstractControl) {
//   const day = new Date(control.value.exportDate);
//   const dayCheck = new Date(control.value.importDate);
//   console.log(day +'ex');
//   console.log(dayCheck + 'ex');
//   // @ts-ignore
//   const check = Math.round(Math.abs((day- dayCheck)/(24*60*60*1000)));
//   console.log(check +'check' + typeof check);
//   // @ts-ignore
//   if ( dayCheck != 0){
//     console.log('null');
//     return null;
//   }
//   console.log('true');
//   return {
//     exportDay: true
//   };
// }

