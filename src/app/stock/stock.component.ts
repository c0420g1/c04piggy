import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

import {Stock} from '../model/Stock';
import {FeedType} from '../model/FeedType';
import {Vendor} from '../model/Vendor';
import {Employee} from '../model/Employee';
import {EmployeeService} from '../service/employee.service';
import {StockService} from '../service/stock.service';
import {ToastrService} from 'ngx-toastr';
import {StockDTO} from '../model/StockDTO';


// creator: Tuong
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  columnHeader = { 'shipmentCode': 'Shipment Code' , 'feedTypeName':'Feed Type','vendorName':'Vendor',
    'expDate': 'Expiry Date', 'quantity': 'Quantity', 'unit': 'Unit','action': 'Action'};

  constructor(public stockService: StockService) { }

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
  stockDTOs: StockDTO[] = [];



  // cac bien cua ham validateShipmentCode
  inputShipmentCode: string;
  shipmentCodeError = false;

  @ViewChild('input') input: ElementRef;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router
              , private stockService: StockService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.stockService.getData(-1,"").subscribe(data => {this.stockDTOs=data; console.log(data)});
    this.stockService.getAllVendor().subscribe((data) => {this.vendors = data; this.vendorDefaultName= data[0].name});
    this.stockService.getAllFeedType().subscribe((data) => {this.feedTypes = data; });

    this.stockForm = this.fb.group({
      id: [this.data.id],
      isDeleted: [0],
      description: [this.data.description, [Validators.maxLength(1000)]],
      importDate: [this.data.importDate, [Validators.required,Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$'),dateValidator]],
      mfgDate: [this.data.mfgDate, [Validators.required,Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$'),compareTwoDates.bind(this)]],
      expDate: [this.data.expDate, [Validators.required,Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$'),compareTwoDates.bind(this)]],
      quantity: [this.data.quantity, [Validators.required,Validators.pattern(/^[0-9]+$/)]],
      shipmentCode: [this.data.shipmentCode, [Validators.required,Validators.pattern(/^[0-9]+$/),Validators.maxLength(8),Validators.minLength(8)]],
      unit: [this.data.unit, [Validators.required,Validators.pattern('(kilogam)|(liter)')]],
      feedTypeId: [this.data.feedTypeId, [Validators.required]],
      vendorId: [this.data.vendorId, [Validators.required]]
    });

    // this.stockForm = new FormGroup({
    //   mfgDate: new FormControl(),
    //   expDate: new FormControl()
    // });

    setTimeout(() => {
      this.input.nativeElement.focus();
    });
  }

  // add & edit Stock
  addEditStock(){
    // console.log(this.stockForm.value);
    this.stockService.addEditStock(this.stockForm.value).subscribe((data)=>{
      console.log(data);
      this.toastr.success('Save to stock successfully', 'Stock');
    });

    this.refeshComponent();
    this.activeModal.close();
  }

  refeshComponent(){
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  // validate Shipment Code
  validateShipmentCode(){
    for (let stockDTO of this.stockDTOs){
      if ((this.stockForm.value.id === null) && (stockDTO.shipmentCode === this.inputShipmentCode)){
        this.shipmentCodeError = true;
      }else {
        this.shipmentCodeError = false;
      }
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
              private stockService: StockService, private employeeService: EmployeeService,
              private toastr: ToastrService) {}

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
       data=> { }
    );
    this.stockService.exportOutStock(this.data.id, this.exportHistoryStockForm.value.quantity).subscribe(
        data=>{
          this.toastr.success('Stock out and save history successfully', 'Stock Out');
          window.location.reload();
        }
    );
    this.refeshComponent();
    this.activeModal.close();
  }

  refeshComponent(){
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }

  // kiểm tra số lượng xuất kho phải nhỏ hơn số lượng tồn kho
  error = false;
  stockOut: number;
  checkQuantity(){
   let stockInQuantity = this.data.quantity;
   let stockOutQuantity = this.stockOut;
   if (stockOutQuantity > stockInQuantity){
     this.error = true;
   }else {
     this.error = false;
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


function compareTwoDates(){
  if(!this.stockForm?.controls?.expDate?.value || !this.stockForm?.controls?.mfgDate?.value) {
    return null;
  }

  let endDate: string[];
  let startDate: string[];
  endDate = this.stockForm.controls.expDate.value.split('-');
  startDate = this.stockForm.controls.mfgDate.value.split('-');
  let dateNumberEnd = (parseInt(endDate[0]) * 365) + (parseInt(endDate[1]) * 30) + (parseInt(endDate[2]));
  let dateNumberStart = (parseInt(startDate[0]) *  365) + (parseInt(startDate[1]) * 30) + (parseInt(startDate[2]));
    if ((dateNumberEnd <= dateNumberStart) || (dateNumberEnd > (dateNumberStart + 100))) {
      return {invalidDate: true};
  }
    return false;
}









