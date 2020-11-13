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
  @Input() columnHeader;
  @Input() tableService;
  @Input() addEditButton;
  currentItems: number=0;
  totalItems: number=0;
  searchValue: string='';
  listPage: number[];
  currentPage: number=1;
  objectKeys = Object.keys;
  dataSource;
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
    this.tableService.getData(-1,this.searchValue).subscribe(data => {
      this.totalItems= data.length; });

    this.tableService.getData(this.currentPage,this.searchValue).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.currentItems= data.length;
      let a: number = this.totalItems/Global.pageSize;
      this.listPage = Array.from({length: a}, (_, index) => index + 1);
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

  onAddEdit(element) {
    this.addEditButton(element, this.modalService);
  }
  //#endregion
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
