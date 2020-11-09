import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {LoadCssService} from '../load-css.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private loadCssService: LoadCssService) { }
  @Input() columnHeader;
  @Input() tableService;
  // tslint:disable-next-line:variable-name
  private _data = new BehaviorSubject<any>([]);
  @Input()
  set tableData(value){
    this._data.next(value);
  }
   get tableData(){
      return this._data.getValue();
   }

  objectKeys = Object.keys;
  dataSource;

  @ViewChild(MatSort) sort: MatSort;
  ngOnInit(): void {
    this.tableService.getAll().subscribe(data => {
      this.dataSource = new MatTableDataSource(data); });
    this.loadCssService.loadCss('assets/vendors/bootstrap/dist/css/bootstrap.min.css');
    this.loadCssService.loadCss('assets/build/css/custom.min.css');
  }

}
