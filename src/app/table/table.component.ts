
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { LoadCssService } from "../load-css.service";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import * as $ from "jquery";
import { Global } from "../model/Global";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnInit {
  //#region Field
  @Input() columnHeader;
  @Input() tableName;
  @Input() tableService;
  @Input() addEditButton;
  @Input() deleteButton;
  @Input() viewButton;
  @Input() exportButton;
  @Input() isDeleteAll: boolean = true;
  @Input() isAdd: boolean = true;
  @Input() ordinalColumn = true;
  @Input() actionName;
  @Input() actionButton;
  data: any;
  currentItems: number = 0;
  totalItems: number = 0;
  searchValue: string = "";
  listPage: number[];
  currentPage: number = 1;
  objectKeys = Object.keys;
  dataSource;
  totalPage: any;
  startPage: any;

  endPage:any;
  pageSize = Global.pageSize;

  @ViewChild(MatSort) sort: MatSort;
  //#endregion

  //#region life cycle
  constructor(
    private loadCssService: LoadCssService,
    public dialog: MatDialog,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (this.ordinalColumn) this.addColumn('No.');
    if (this.isDeleteAll) this.addColumn('Select');
    console.log(this.columnHeader);
    this.getDataSource();

    this.loadCssService.loadCss(
      "assets/vendors/bootstrap/dist/css/bootstrap.min.css"
    );
    this.loadCssService.loadCss("assets/build/css/custom.min.css");

  }
  //#endregion

  //#region private method

  getDataSource() {
    this.tableService.getData(-1, this.searchValue).subscribe((data) => {
      this.totalItems = data.length;
      this.totalPage = Math.ceil(this.totalItems / Global.pageSize);
      console.log("total" + this.totalPage);
      this.tableService
        .getData(this.currentPage, this.searchValue)
          // tslint:disable-next-line:no-shadowed-variable
        .subscribe((data) => {
          this.data = data;
          this.dataSource = new MatTableDataSource(data);
          this.currentItems = data.length;
          this.setPage(this.currentPage);
        });
    });
  }

  private addColumn(val) {
    var obj = this.columnHeader;
    var result = Object.keys(obj).map(function (key) {
      return [key, obj[key]];
    });

    result.unshift([val, val]);
    let tmp = Object.values(result);
    let res = {};
    for (let i = 0; i < tmp.length; i++) {
      res[tmp[i][0]] = tmp[i][1];
    }

    this.columnHeader = res;
  }
  //#endregion

  //#region table
  next() {
    if (this.currentPage < this.listPage.length) {
      this.currentPage++;
      this.getDataSource();
    }
  }
  previous() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getDataSource();
    }
  }

  searchInput(val) {
    this.searchValue = val;
  }

  search() {
    this.currentPage = 1;
    console.log(this.searchValue);
    this.getDataSource();
  }

  onDelete(element) {
    let ids: number[] = [];
    ids.push(element.id);
    const modalRef = this.modalService.open(DeleteModal);
    modalRef.componentInstance.ids = ids;
    modalRef.componentInstance.service = this.tableService;
  }
  isSelectAll() {
    $('table tbody input[type="checkbox"]').prop(
      "checked",
      $("#selectAll").is(":checked")
    );
  }
  checkit() {
    $("#selectAll").prop("checked", false);
  }
  fdelete() {
    let ids: number[] = [];
    var checkbox = $('table tbody input[type="checkbox"]');
    checkbox.each(function (index) {
      if ((checkbox[index] as HTMLInputElement).checked) {
        let t = Number($(this).val());
        ids.push(t);
      }
    });
    if (ids.length == 0){
      this.toastr.error('Must be check on check box', 'C04piggy')
    }else if (ids.length != 0) {
      const modalRef = this.modalService.open(DeleteModal);
      modalRef.componentInstance.ids = ids;
      modalRef.componentInstance.service = this.tableService;
    }
  }

  changePage(currentPage) {
    this.currentPage = currentPage;
    this.getDataSource();
  }
  setPage(currentPage) {
    let totalPage = Math.ceil(this.totalItems / Global.pageSize);
    let maxPage = 5;
    if (currentPage < 1) {
      this.currentPage = 1;
    } else if (currentPage > totalPage) {
      this.currentPage = totalPage;
    }
    let startPage: number, endPage: number;
    if (totalPage <= maxPage) {
      startPage = 1;
      endPage = totalPage;
    } else {
      let maxPagesBeforeCurrentPage = Math.floor(maxPage / 2);
      let maxPagesAfterCurrentPage = Math.ceil(maxPage / 2) - 1;
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

  onAddEdit(element) {
    this.addEditButton(element, this.modalService);
  }
  onView(element: any) {
    this.viewButton(element, this.modalService);
  }
  onExport(element: any) {
    this.exportButton(element, this.modalService);
  }
  onAction(element: any) {
    this.actionButton(element, this.modalService);
  }
  //#endregion
}

@Component({
  templateUrl: "./delete-modal.html",
})
export class DeleteModal {
  @Input() service;
  @Input() ids: number[];
  constructor(public activeModal: NgbActiveModal, private router: Router, private toastr: ToastrService) {}

  delete(){
      this.service.delete(this.ids).subscribe(data => {
        this.toastr.success('Delete successfully', 'Treatment');
      });
      this.activeModal.close();
      this.refeshComponent();
  }
  refeshComponent(){
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
}
