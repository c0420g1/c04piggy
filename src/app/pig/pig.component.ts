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
import {Global} from '../model/Global';

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
  pig: Pig;

  // Pagination
  currentItems: number=0;
  totalItems: number=0;
  search: string ='';
  listPage: number[];
  currentPage: number =1;
  totalPage: any;
  startPage: any;
  endPage:any;
  pageSize = 5;

  // Form
  isDeleteAll:boolean=false;
  addNewPigForm: FormGroup;
  checkIfPigNewBorn = false;
  addNewPigStatus: FormGroup;
  editNewPigForm: FormGroup;



  constructor(private pigService: PigService,
              private fb: FormBuilder,
              private fbEdit: FormBuilder,
              private fbStatus: FormBuilder,
              private feedService: FeedService,
              private pigStatusService: StatusService,
              private modalService: NgbModal) { }

  ngOnInit(): void {

    //get list
    this.pigService.getListHerd().subscribe((herds) =>{
      this.herdList = herds;
    });

    this.feedService.getData().subscribe((feeds) =>{
      this.feedList = feeds;
    });

    this.pigStatusService.getAllStatus().subscribe((status) =>{
      this.pigStatus = status;
    })

    this.getPigList();

    //add (new import/new born)
    if (this.checkIfPigNewBorn) {
      this.addNewPigForm = this.fb.group({
        description: [''],
        code: ['', Validators.required],
        dateGroup: this.fb.group({
          importDate: ['', [Validators.required, importDayCheckValidator]],
          exportDate: ['', Validators.required]
        }, {validators: exportDayCheckValidator}),
        gender: [''],
        spec: [''],
        weight: [''],
        color: [''],
        parentsGroup: this.fb.group({
          fatherId: ['',Validators.required],
          motherId: ['',Validators.required],
        }),
        feed: Feed,
        herd: Herd,
      });
    }else {
      this.addNewPigForm = this.fb.group({
        description: [''],
        code: ['', Validators.required],
        dateGroup: this.fb.group({
          importDate: ['', [Validators.required, importDayCheckValidator]],
          exportDate: ['', Validators.required]
        }, {validators: exportDayCheckValidator}),
        gender: [''],
        spec: [''],
        weight: [''],
        color: [''],
        feed: Feed,
        herd: Herd,
      });
    }

    this.addNewPigStatus = this.fbStatus.group({
      description: [''],
      pig: Pig,
      pigStatus: PigStatus,
    })

    this.editNewPigForm = this.fbEdit.group({
      id: [''],
      description: [''],
      code: ['', Validators.required],
      dateGroup: this.fb.group({
        importDate: ['', [Validators.required, importDayCheckValidator]],
        exportDate: ['', Validators.required]
      }, {validators: exportDayCheckValidator}),
      gender: [''],
      spec: [''],
      weight: [''],
      color: [''],
      feed: Feed,
      herd: Herd,
    })
  }

  searchPig() {
    this.currentPage =1;
    this.ngOnInit();
  }

  addPig() {
    if (this.addNewPigForm.valid) {
      const {value} = this.addNewPigForm;
      this.pigService.addPig(value).subscribe(() => this.ngOnInit());
    }
  }

  editPig(pig: Pig){
    this.editNewPigForm.setValue(pig);
  };

  editPigConfirm() {
    this.pig = this.editNewPigForm.value;
    if (this.editNewPigForm.valid) {
      const { value } = this.editNewPigForm;
      const data = {
        ...this.pig,
        ...value
      };
      this.pigService.editPig(data).subscribe(() => this.ngOnInit());
    };
  };

  onDelete(element){
    let ids: number[]=[];
    ids.push(element.id);
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.ids = ids;
    modalRef.componentInstance.service = this.pigService;
  }
  isSelectAll(){
    $('table tbody input[type="checkbox"]').prop('checked', $('#selectAll').is(':checked'));
  }
  checkit(){
    $('#selectAll').prop('checked', false);
  }
  fdelete(){
    let ids: number[]=[];
    var checkbox = $('table tbody input[type="checkbox"]');
    checkbox.each(function(index){
      if((checkbox[index] as HTMLInputElement).checked){
        let t= Number($(this).val());
        ids.push(t);
      }
    });
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.ids = ids;
    modalRef.componentInstance.service = this.pigService;
  }

  //pagenation
  changePage(currentPage){
    this.currentPage= currentPage;
    this.getPigList();
  }
  setPage(currentPage){
    let totalPage = Math.ceil(this.totalItems/this.pageSize)
    let maxPage = 5;
    if(currentPage < 1){
      this.currentPage = 1;
    }else if(currentPage > totalPage){
      this.currentPage = totalPage;
    }
    let startPage: number, endPage: number;
    if (totalPage <= maxPage){
      startPage = 1;
      endPage = totalPage;
    }else {
      let maxPagesBeforeCurrentPage = Math.floor(maxPage / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPage / 2) - 1;
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
    this.endPage = this.listPage[this.listPage.length-1];
    console.log(this.endPage);
  }

  next(){
    if(this.currentPage<this.listPage.length){
      this.currentPage++;
      this.getPigList();
    }

  }
  previous(){
    if(this.currentPage>1)  {
      this.currentPage--;
      this.getPigList();
    }
  }

  //Change to new born input form
  onNewBornChange() {
    this.checkIfPigNewBorn = true;
    this.addNewPigForm.reset();
  }

  getMotherPig(id: number){
    const motherPig = this.pigList[id]
    return motherPig;
  }

  getFatherPig(id: number){
    const fatherPig = this.pigList[id]
    return fatherPig;
  }

  private getPigList() {
    this.pigService.search(0,this.search).subscribe(data => {
      if (data.length === 0) {
        this.message = 'Không tìm thấy đặt dữ liệu nào!';
      } else {
        this.message = '';
      }
      this.totalItems= data.length;
      this.totalPage = Math.ceil(this.totalItems/this.pageSize);
      console.log('total'+ this.totalPage);
      this.pigService.search(this.currentPage,this.search).subscribe(data => {
        this.pigList= data;
        this.currentItems= data.length;
        this.setPage(this.currentPage);
      });
    });
  }

}


//Validator Day

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
  console.log(day +'ex');
  console.log(dayCheck + 'ex');
  // @ts-ignore
  const check = Math.round(Math.abs((day- dayCheck)/(24*60*60*1000)));
  console.log(check +'check' + typeof check);
  // @ts-ignore
  if ( dayCheck != 0){
    console.log('null');
    return null;
  }
  console.log('true');
  return {
    exportDay: true
  };
}

