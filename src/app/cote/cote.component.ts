import { Component, OnInit } from '@angular/core';
import {Cote} from '../model/Cote';
import {CoteService} from '../service/cote.service';
import {CoteDTO} from '../model/CoteDTO';
import {Form, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Account} from '../model/Account';
import {Herd} from '../model/Herd';
import {EmployeeService} from '../service/employee.service';
import {Employee} from '../model/Employee';
import {PigService} from '../service/pig.service';

@Component({
  selector: 'app-cote',
  templateUrl: './cote.component.html',
  styleUrls: ['./cote.component.css']
})
export class CoteComponent implements OnInit {
  variableFind = '';
  coteList: CoteDTO[] = [];
  employeeList: Employee[] = [];
  herdList:  Herd[] = [];
  message: string;

  // Pagination
  currentPage = 1;
  entityNumber: number;
  totalEntities: number;
  totalPage: number;
  jumpPage: number;
  // Pagination
  addNewCoteForm: FormGroup;

  constructor(private coteService: CoteService,
              private fb: FormBuilder,
              private employeeService: EmployeeService,
              private pigService: PigService) { }

  ngOnInit(): void {

    this.coteService.getListCote(this.variableFind).subscribe((data) => {
      this.totalEntities = data.length;
      this.totalPage = this.totalEntities / 3;
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

    this.employeeService.getAllEmployee().subscribe((employees) =>{
      this.employeeList = employees;
    });
    this.pigService.getListHerd().subscribe((herds) =>{
      this.herdList = herds;
    })

    this.addNewCoteForm = this.fb.group({
      id: [''],
      description: [''],
      isDeleted: [''],
      code: [''],
      importDate: [''],
      exportDate: [''],
      quantity: [''],
      type: [''],
      employee: Employee,
      herd: Herd,
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
    if (this.currentPage < this.totalEntities / 3) {
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

  AddNewCote(form: FormGroup) {
    this.coteService.addNewCote(form.value).subscribe(()=> this.ngOnInit());
    document.getElementById("add").click();
  }
}
