import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {HistoryExport} from '../model/HistoryExport';
import {HistoryExportService} from '../service/history-export.service';

@Component({
  selector: 'app-history-export',
  templateUrl: './history-export.component.html',
  styleUrls: ['./history-export.component.css']
})
export class HistoryExportComponent implements OnInit {
  columnHeader = {'No.':'No.','coteCode': 'Cote Code', 'employeeCode': 'Staff Name', 'company': 'Company', 'exportDate': 'Export Date',
  'quantity': 'Quantity', 'weightTotal': 'Weight Total', 'total': 'Total', 'action': 'Action'};

  constructor(public historyExportService: HistoryExportService) { }

  ngOnInit(): void {

  }
}


