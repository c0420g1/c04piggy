import { Component, OnInit } from '@angular/core';
import { HistoryExportService } from '../service/history-export.service';


@Component({
  selector: 'app-export-history-stock',
  templateUrl: './export-history-stock.component.html',
  styleUrls: ['./export-history-stock.component.css']
})

export class ExportHistoryStockComponent implements OnInit {
  columnHeader = { 'shipmentCode': 'Shipment Code' , 'feedTypeName':'Feed Type','vendorName':'Vendor', 'exportDate': 'Stock out Date',
    'quantityExport': 'Quantity', 'unit': 'Unit','exportEmployeeName': 'Stock Employee','receiveEmployeeName': 'Received Employee'};
  constructor( public historyExportService: HistoryExportService) { }

  ngOnInit(): void {
  }

}
