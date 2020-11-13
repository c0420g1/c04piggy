import { Component, OnInit } from '@angular/core';
import { PigAssociateStatus } from '../model/PigAssociateStatus';
import { TreatmentVacxins } from '../model/TreatmentVacxins';
import {Pig} from '../model/Pig';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PigService} from '../service/pig.service';

@Component({
  selector: 'app-pig',
  templateUrl: './pig.component.html',
  styleUrls: ['./pig.component.css']
})
export class PigComponent implements OnInit {
  search = '';
  message: string;
  pigAssociateStatusList: PigAssociateStatus[] = [];
  pigList: Pig[] = [];

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
  }

}
