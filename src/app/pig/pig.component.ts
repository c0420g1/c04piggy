import { Component, OnInit } from '@angular/core';
import { PigAssociateStatus } from '../model/PigAssociateStatus';
import { TreatmentVacxins } from '../model/TreatmentVacxins';
import {Pig} from '../model/Pig';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PigService} from '../service/pig.service';
import {PigDTO} from '../model/PigDTO';

@Component({
  selector: 'app-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})
export class PigComponent implements OnInit {
  search = '';
  message: string;
  pigAssociateStatusList: PigAssociateStatus[] = [];
  pigList: PigDTO[] = [];

  // Pagination
  currentPage = 1;
  entityNumber: number;
  totalEntities: number;
  totalPage: number;
  jumpPage: number;
  // Pagination
  addNewPage: FormGroup;


  constructor(private pigService: PigService,
              private fb: FormBuilder,
              ) { }

  ngOnInit(): void {
    this.pigService.getListPigForShow(this.currentPage, this.search).subscribe((data) => {
      if (data.length === 0) {
        this.message = 'Không tìm thấy đặt dữ liệu nào!';
      } else {
        this.message = '';
      }
      this.entityNumber = data.length;
      this.pigList = data;
    });
  }

  searchPig() {
    this.ngOnInit();
  }

}
