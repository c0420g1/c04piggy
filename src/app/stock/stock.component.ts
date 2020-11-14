import {Component, Input, OnInit} from '@angular/core';
import {StockService} from '../service/stock.service';
import {Stock} from '../model/Stock';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {FeedType} from '../model/FeedType';
import {Vendor} from '../model/Vendor';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  actionName="Import";

  columnHeader = { 'shipmentCode': 'Shipment Code' , 'feedTypeName':'Feed Type','vendorName':'Vendor',
    'expDate': 'Expiry Date', 'quantity': 'Quantity', 'unit': 'Unit','action': 'Actions'};

  constructor(public stockService: StockService) { }

  ngOnInit(): void {

  }

  onAction(element, modal){
    const modalRef = modal.open(StockModal);
    modalRef.componentInstance.data = new Stock();
  }

  onExport(element, modal){
    const modalRef = modal.open(StockModal);
    modalRef.componentInstance.data =element;
  }

  onAddEdit(element, modal){
    const modalRef = modal.open(StockModal);
    modalRef.componentInstance.data =element;
  }
}

@Component({
  templateUrl: './stock-modal.html'
})
export class StockModal implements OnInit {
  vendors: Vendor[] = [];
  feedTypes: FeedType[] = [];
  @Input() data;
  @Input() title;

  stockForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router, private stockService: StockService) {}

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      id: [this.data.id],
      isDeleted: [0],
      description: [this.data.description],
      expDate: [this.data.expDate],
      importDate: [this.data.importDate],
      mfgDate: [this.data.mfgDate],
      quantity: [this.data.quantity],
      shipmentCode: [this.data.shipmentCode],
      unit: [this.data.unit],
      feedType: [this.data.feedType],
      vendor: [this.data.vendor]
    });
    this.stockService.getAllVendor().subscribe((data) => {this.vendors = data; console.log("vendor: " + this.vendors)});
    this.stockService.getAllFeedType().subscribe((data) => {this.feedTypes = data; console.log("feedType: " + this.feedTypes) });
  }

  addNewStock(){

  }

  onSubmit(){}
}
