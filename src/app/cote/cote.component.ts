import { Component, OnInit } from '@angular/core';
import {Cote} from '../model/Cote';
import {CoteService} from '../service/cote.service';
import {CoteDTO} from '../model/CoteDTO';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Account} from '../model/Account';
import {Herd} from '../model/Herd';
import {EmployeeService} from '../service/employee.service';
import {Employee} from '../model/Employee';

@Component({
  selector: 'app-cote',
  templateUrl: './cote.component.html',
  styleUrls: ['./cote.component.css']
})
export class CoteComponent implements OnInit {
  variableFind = '';
  coteList: CoteDTO[] = [];
  employeeList: Employee[] = [];
  herdList:  ['A','B','C'];
  message: string;

  // Pagination
  currentPage = 1;
  entityNumber: number;
  totalEntities: number;
  totalPage: number;
  jumpPage: number;
  // Pagination
  addNewCote: FormGroup;

  constructor(private coteService: CoteService,
              private fb: FormBuilder,
              private employeeService: EmployeeService) { }

  ngOnInit(): void {

    this.coteService.getListCote(this.variableFind).subscribe((data) => {
      this.totalEntities = data.length;
      this.totalPage = this.totalEntities / 10;
    });

    this.coteService.getAllCote(this.currentPage, this.variableFind).subscribe((data) => {
      if (data.length === 0) {
        this.message = 'Không tìm thấy đặt dữ liệu nào!';
      } else {
        this.message = '';
      }
      this.entityNumber = data.length;
      this.coteList = data;
    });

    this.addNewCote = new FormGroup({
      id: new FormControl(''),
      description: new FormControl(''),
      isDeleted: new FormControl(''),
      code: new FormControl(''),
      importDate: new FormControl(''),
      exportDate: new FormControl(''),
      quantity: new FormControl(''),
      type: new FormControl(''),
      employee: new FormControl(''),
      herd: new FormControl(''),
    });

  }

  search() {
    this.ngOnInit();
  }

  prePage(): void {
    if (this.currentPage >= 2 ){
      this.currentPage--;
      this.jumpPage = this.currentPage;
    }
    this.ngOnInit();
  }

  nexPage(): void {
    if (this.currentPage < this.totalEntities / 10) {
      this.currentPage++;
      this.jumpPage = this.currentPage;
    }
    console.log(this.currentPage)
    this.ngOnInit();
  }

  goToPage() {
    this.currentPage = this.jumpPage;
    this.ngOnInit();
  }

  AddNewCote(cote: Cote) {
    this.coteService.addNewCote(cote);
    this.ngOnInit();
  }
}
