import { Component, OnInit } from '@angular/core';
import {StockService} from '../service/stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {

  columnHeader = { 'id': 'ID', 'shipmentCode': 'Shipment Code' , 'feedTypeName':'Feed Type','vendorName':'Vendor',
    'expDate': 'Expiry Date', 'quantity': 'Quantity', 'unit': 'Unit','action': 'Action'};

  constructor(public stockService: StockService) { }

  ngOnInit(): void {
  }

}
