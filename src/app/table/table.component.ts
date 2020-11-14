import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {LoadCssService} from '../load-css.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { Global } from '../model/Global';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  //#region Field
  @Input() edit;
  @Input() delete;
  @Input() view;
  @Input() deleteAll;
  @Input() columnHeader;
  @Input() tableService;
  @Input() addEditButton;
  currentItems: number=0;
  totalItems: number=0;
  searchValue: string ='';
  listPage: number[] = null;
  currentPage: number =1;
  objectKeys = Object.keys;
  dataSource;
  totalPage: any;
  startPage: any;
  endPage:any;

  @ViewChild(MatSort) sort: MatSort;
  //#endregion
  
  //#region life cycle
  constructor(private loadCssService: LoadCssService, public dialog: MatDialog, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getDataSource();
    this.loadCssService.loadCss('assets/vendors/bootstrap/dist/css/bootstrap.min.css');
    this.loadCssService.loadCss('assets/build/css/custom.min.css');
  }
  //#endregion
  
  getDataSource(){
    console.log(this.searchValue)
    this.tableService.getData(1,this.searchValue).subscribe(data => {
      this.totalItems= data.length;
      console.log(this.totalItems)
      this.totalPage = Math.ceil(this.totalItems/Global.pageSize);
      console.log('total'+ this.totalPage)
      this.tableService.getData(this.currentPage,this.searchValue).subscribe(data => {
        console.log('a'+ this.searchValue)
        this.dataSource = new MatTableDataSource(data);
        this.currentItems= data.length;
        this.setPage(this.currentPage);
    });
  });
  }

  //#region table
  next(){
    if(this.currentPage<this.listPage.length){
      this.currentPage++;
      this.getDataSource();
    }
      
  }
  previous(){
    if(this.currentPage>1)  {
      this.currentPage--;
      this.getDataSource();
    }
  
  }

  searchInput(val){
    this.searchValue= val;
  }

  search(){
    console.log(this.searchValue)
    this.getDataSource();
  }

  onDelete(element){
    let ids: number[]=[];
    ids.push(element.id);
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.ids = ids;
    modalRef.componentInstance.service = this.tableService;
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
    modalRef.componentInstance.service = this.tableService;
  }
  
  changePage(currentPage){
    this.currentPage= currentPage;
    this.getDataSource();
  }
  setPage(currentPage){
    let totalPage = Math.ceil(this.totalItems/Global.pageSize)
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

  onAddEdit(element) {
    this.addEditButton(element, this.modalService);
  }
  //#endregion
  onView(element: any) {
    this.addEditButton(element, this.modalService);
  }
}

@Component({
  templateUrl: './delete-modal.html'
})
export class DeleteModal{
  @Input() service;
  @Input() ids: number[];
  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  delete(){
      this.service.delete(this.ids).subscribe();
  }
}
