import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

import {Stock} from '../model/Stock';
import {FeedType} from '../model/FeedType';
import {Vendor} from '../model/Vendor';
import {Employee} from '../model/Employee';
import {EmployeeService} from '../service/employee.service';
import {StockService} from '../service/stock.service';


// creator: Tuong
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  actionName = "Stock In";

  columnHeader = { 'shipmentCode': 'Shipment Code' , 'feedTypeName':'Feed Type','vendorName':'Vendor',
    'expDate': 'Expiry Date', 'quantity': 'Quantity', 'unit': 'Unit','action': 'Action'};

  constructor(public stockService: StockService, private router: Router) { }

  ngOnInit(): void {
  }

  // để hiển thị modal nhập kho
  onAction(element, modal){
    const modalRef = modal.open(StockModal);
    modalRef.componentInstance.data = new Stock();
    modalRef.componentInstance.title = 'Stock In';
  }

  // để hiển thị modal xuất kho
  onExport(element, modal){
    const modalRef = modal.open(ExportModal);
    modalRef.componentInstance.data = element ;
    modalRef.componentInstance.title = 'Stock Out';
  }

  // để hiển thị modal chỉnh sửa kho
  onAddEdit(element, modal){
    const modalRef = modal.open(StockModal);
    modalRef.componentInstance.data = element ?? new Stock();
    modalRef.componentInstance.title = element ? 'Edit Stock' : '';
  }
}

@Component({
  templateUrl: './stock-modal.html'
})
export class StockModal implements OnInit {
  @Input() data;
  @Input() title;
  vendors: Vendor[] = [];
  feedTypes: FeedType[] = [];
  vendorDefaultName: string='';
  stockForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router, private stockService: StockService) {}

  ngOnInit(): void {
    this.stockService.getAllVendor().subscribe((data) => {this.vendors = data; this.vendorDefaultName= data[0].name});
    this.stockService.getAllFeedType().subscribe((data) => {this.feedTypes = data; });

    this.stockForm = this.fb.group({
      id: [this.data.id, [Validators.required,]],
      isDeleted: [0],
      description: [this.data.description, [Validators.maxLength(1000)]],
      expDate: [this.data.expDate, [Validators.required,Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
      importDate: [this.data.importDate, [Validators.required,Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$'),dateValidator]],
      mfgDate: [this.data.mfgDate, [Validators.required,Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$')]],
      quantity: [this.data.quantity, [Validators.required,Validators.pattern(/^[0-9]+$/)]],
      shipmentCode: [this.data.shipmentCode, [Validators.required,Validators.pattern(/^[0-9]+$/),Validators.maxLength(8),Validators.minLength(8)]],
      unit: [this.data.unit, [Validators.required,Validators.pattern('(kilogam)|(liter)')]],
      vendorName: [this.data.vendorName, [Validators.required]],
      feedTypeId: [this.data.feedTypeId, [Validators.required]],
      vendorId: [this.data.vendorId, [Validators.required]]
    });
    console.log("mfg date"+this.stockForm.value.mfgDate);
    console.log("exp date"+this.stockForm.value.expDate);
    console.log("import date"+this.stockForm.value.importDate);
  }

  // add & edit Stock
  addEditStock(){
    console.log(this.stockForm.value);
      this.stockService.addEditStock(this.stockForm.value).subscribe((data)=>{});
  }

  // validate start date < end date
  end: string;
  start: string;
  error = false;

  compareTwoDates() {
    let endDate: string[];
    let startDate: string[];
    endDate = this.end.split('-');
    startDate = this.start.split('-');
    let dateNumberEnd = (parseInt(endDate[0]) * 365) + (parseInt(endDate[1]) * 30) + (parseInt(endDate[2]));
    let dateNumberStart = (parseInt(startDate[0]) *  365) + (parseInt(startDate[1]) * 30) + (parseInt(startDate[2]));
    if ((dateNumberEnd <= dateNumberStart) || (dateNumberEnd > (dateNumberStart + 90))) {
      this.error = true;
    } else {
      this.error = false;
    }
  }


}

@Component({
  templateUrl: './export-modal.html'
})
export class ExportModal implements OnInit {
  @Input() data;
  @Input() title;

  exportHistoryStockForm: FormGroup;
  employees: Employee[] = [];
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router,
              private stockService: StockService, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getAllEmployee().subscribe((data) => {this.employees = data; });
    this.exportHistoryStockForm = this.fb.group({
      description: ['', Validators.maxLength(1000)],
      isDeleted: [0],
      exportDate: ['',[Validators.required,dateValidator]],
      quantity: ['',[Validators.required,]],
      receivedEmployeeId: ['',[Validators.required]],
      type: ['stock'],
      unit: [this.data.unit,[Validators.required,]],
      employee: ['',[Validators.required,]],
      stock: [this.data,[Validators.required,]]
    });

    console.log(this.data);
  }

  // them vao bang lich su va xuat khoi kho
  addExportHistoryStockAndExportOutStock(){
    this.stockService.addHistoryExportStock(this.exportHistoryStockForm.value).subscribe(
       data=> {}
    );
    this.stockService.exportOutStock(this.data.id, this.exportHistoryStockForm.value.quantity).subscribe(
        data=>{window.location.reload();}
    );
  }

  error = false;
  stockOut: number;
  checkQuantity(){
   let stockInQuantity = this.data.quantity;
   let stockOutQuantity = this.stockOut;
   if (stockOutQuantity > stockInQuantity){
     this.error = true;
   }
  }

}
// function to validate date < current date
function dateValidator(formControl: FormControl) {
  if(formControl.value == undefined) {
    return null;
  }
  let date1: string[];
  date1 = formControl.value.split('-');
  const o_date = new Intl.DateTimeFormat;
  const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
  const m_date = o_date.formatToParts().reduce(f_date, {});
  const dateNumber = (parseInt(date1[0]) * 365) + (parseInt(date1[1]) * 30) + (parseInt(date1[2]));
  const dateNumberNow = (parseInt(m_date.year) * 365) + (parseInt(m_date.month) * 30) + (parseInt(m_date.day));
  if (dateNumber > dateNumberNow) {
    return {checkDate: true};
  }
  return null;
}



