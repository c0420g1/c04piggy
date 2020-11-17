import { Component, OnInit } from '@angular/core';
import { PigAssociateStatus } from '../model/PigAssociateStatus';
import {Pig} from '../model/Pig';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PigService} from '../service/pig.service';
import {PigDTO} from '../model/PigDTO';
import {Herd} from '../model/Herd';
import {PigStatus} from '../model/PigStatus';
import { Feed } from '../model/Feed';
import {FeedService} from '../service/feed.service';
import { StatusService } from '../service/status.service';

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
  pigStatus: PigStatus[] = [];
  feedList: Feed[] = [];
  herdList: Herd[] = [];

  // Pagination
  currentPage = 1;
  entityNumber: number;
  totalEntities: number;
  totalPage: number;
  jumpPage: number;
  // Pagination
  addNewPigForm: FormGroup;
  checkIfPigNewBorn: string;
  addNewPigStatus: FormGroup;
  editNewPigForm: FormGroup;


  constructor(private pigService: PigService,
              private fb: FormBuilder,
              private fbEdit: FormBuilder,
              private fbStatus: FormBuilder,
              private feedService: FeedService,
              private pigStatusService: StatusService) { }

  ngOnInit(): void {

    //get list
    this.pigService.getListHerd().subscribe((herds) =>{
      this.herdList = herds;
    });

    this.feedService.getAll().subscribe((feeds) =>{
      this.feedList = feeds;
    });

    this.pigService.search(this.currentPage, this.search).subscribe((data) => {
      if (data.length === 0) {
        this.message = 'Không tìm thấy đặt dữ liệu nào!';
      } else {
        this.message = '';
      }
      this.entityNumber = data.length;
      this.pigList = data;
    });

    //add
    if (this.checkIfPigNewBorn.match("born")) {
      this.addNewPigForm = this.fb.group({
        description: [''],
        code: ['', Validators.required],
        dateGroup: this.fb.group({
          importDate: ['', [Validators.required, importDayCheckValidator]],
          exportDate: ['', Validators.required]
        }, {validators: exportDayCheckValidator}),
        gender: [''],
        spec: [''],
        weight: [''],
        color: [''],
        fatherId: [''],
        motherId: [''],
        feed: Feed,
        herd: Herd,
      });
    }else {
      this.addNewPigForm = this.fb.group({
        description: [''],
        code: ['', Validators.required],
        dateGroup: this.fb.group({
          importDate: ['', [Validators.required, importDayCheckValidator]],
          exportDate: ['', Validators.required]
        }, {validators: exportDayCheckValidator}),
        gender: [''],
        spec: [''],
        weight: [''],
        color: [''],
        feed: Feed,
        herd: Herd,
      });
    }

    this.addNewPigStatus = this.fbStatus.group({
      description: [''],
      pig: Pig,
      pigStatus: PigStatus,
    })

    this.editNewPigForm = this.fbEdit.group({
      id: [''],
      description: [''],
      code: ['', Validators.required],
      dateGroup: this.fb.group({
        importDate: ['', [Validators.required, importDayCheckValidator]],
        exportDate: ['', Validators.required]
      }, {validators: exportDayCheckValidator}),
      gender: [''],
      spec: [''],
      weight: [''],
      color: [''],
      feed: Feed,
      herd: Herd,
    })
  }

  searchPig() {
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


}

// Customer Validator ImportDay

function importDayCheckValidator(control: AbstractControl) {
  const currentDay = new Date();
  const day = new Date(control.value);
  if (day >= currentDay || (day.getFullYear() == day.getFullYear() && day.getMonth() == currentDay.getMonth() && day.getDay() == currentDay.getDay()) ){
    return null;
  }
  return {
    importDay: true
  };
}

function exportDayCheckValidator(control: AbstractControl) {
  const day = new Date(control.value.exportDate);
  const dayCheck = new Date(control.value.importDate);
  console.log(day +'ex');
  console.log(dayCheck + 'ex');
  // @ts-ignore
  const check = Math.round(Math.abs((day- dayCheck)/(24*60*60*1000)));
  console.log(check +'check' + typeof check);
  // @ts-ignore
  if ( dayCheck != 0){
    console.log('null');
    return null;
  }
  console.log('true');
  return {
    exportDay: true
  };
}
