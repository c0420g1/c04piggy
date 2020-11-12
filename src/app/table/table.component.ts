import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {LoadCssService} from '../load-css.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private loadCssService: LoadCssService, public dialog: MatDialog, private modalService: NgbModal) { }
  @Input() columnHeader;
  @Input() tableService;
  @Input() addEditButton;
  currentItems: number=0;
  totalItems: number=0;
  searchValue: string='';
  listPage: number[]=[];
  objectKeys = Object.keys;
  dataSource;
  @ViewChild(MatSort) sort: MatSort;
  onAddEdit(element) {
    this.addEditButton(element, this.modalService);
  }

  next(){

  }
  previous(){
    
  }
  search(){
    this.getDataSource();
  }

  getDataSource(){
    this.tableService.search(1,this.searchValue).subscribe(data => {
      this.currentItems= data.length;
      this.dataSource = new MatTableDataSource(data);
      let a: number = this.totalItems/this.currentItems;
      // alert(Math.ceil(a)); });
  }
  searchInput(val){
    this.searchValue= val;
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
  ngOnInit(): void {
    this.tableService.getAll().subscribe(data => {
      this.totalItems= data.length;
      this.dataSource = new MatTableDataSource(data); });

    this.getDataSource();
    this.loadCssService.loadCss('assets/vendors/bootstrap/dist/css/bootstrap.min.css');
    this.loadCssService.loadCss('assets/build/css/custom.min.css');
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
