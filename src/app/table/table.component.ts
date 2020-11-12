import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {LoadCssService} from '../load-css.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private loadCssService: LoadCssService, public dialog: MatDialog, private modalService: NgbModal) { }
  @Input() columnHeader;
  @Input() tableService;
  @Input() editButton;
  objectKeys = Object.keys;
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  onEdit(element) {
    this.editButton(element, this.modalService);
  }

  onDelete(element){
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.id = element.id;
    modalRef.componentInstance.service = this.tableService;
  }

  ngOnInit(): void {
    this.tableService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data); });
    this.loadCssService.loadCss('assets/vendors/bootstrap/dist/css/bootstrap.min.css');
    this.loadCssService.loadCss('assets/build/css/custom.min.css');
  }
}

@Component({
  templateUrl: './delete-modal.html'
})
export class DeleteModal{
  @Input() service;
  @Input() id;
  ids: number[];
  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  delete(){
      this.ids.push(this.id);
      this.service.delete(this.ids).subscribe();
      alert("deleted");
  }
}
