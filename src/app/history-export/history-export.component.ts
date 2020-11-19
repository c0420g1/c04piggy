import {Component, Input, OnInit} from '@angular/core';
import {HistoryExportService} from '../service/history-export.service';

@Component({
  selector: 'app-history-export',
  templateUrl: './history-export.component.html',
  styleUrls: ['./history-export.component.css']
})
export class HistoryExportComponent implements OnInit {
  columnHeader = {'No.':'No.','coteCode': 'Cote Code','herdCode': 'Herd Code', 'employeeCode': 'Staff Name', 'company': 'Company | Partner', 'exportDate': 'Export Date',
  'quantity': 'Quantity', 'weightTotal': 'Weight Total', 'total': 'Total'};

  constructor(public historyExportService: HistoryExportService,

  ) { }

  ngOnInit(): void {

  }


}


