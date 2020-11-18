import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cote } from '../model/Cote';
import { Pig } from '../model/Pig';
import { TreatmentVacxins } from '../model/TreatmentVacxins';
import { VacxinService } from '../service/vacxin.service';

@Component({
  selector: 'app-vacxin',
  templateUrl: './vacxin.component.html',
  styleUrls: ['./vacxin.component.css']
})
export class VacxinComponent implements OnInit {
  columnHeader = {'treatDate': 'Date', 'coteCode': 'Cote Code', 'pigCode': 'Pig Code',
  'veterinarian': 'Veterinarians' ,'diseases': 'Diseases','vacxin': 'Medicine', 'action': 'Action'};
  constructor(public vacxinService: VacxinService) { }

  ngOnInit(): void {
  }

  onAddEdit(element, modal) {
    const modalRef = modal.open(VacxinModal);
    modalRef.componentInstance.data = element ?? new TreatmentVacxins();
    modalRef.componentInstance.title = element ? 'Edit Information' : 'Add Information';
  }
}

@Component({
  templateUrl: './vacxin-modal.html'
})
export class VacxinModal implements OnInit{
  @Input() data;
  @Input() title;
  coteList: Cote[] = [];
  pigList: Pig[] = [];
  treatmentForm: FormGroup;
  checkCoteCode: Cote;
  coteId = 1;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router,
              private vacxinService: VacxinService, private toastr: ToastrService){}

  ngOnInit(): void {
  //   this.vacxinService.getAllCote().subscribe(data => {
  //     this.coteList = data;
  //   })
  //   if (this.checkCoteCode != null){
  //     this.vacxinService.getPigByCoteId(this.checkCoteCode.id).subscribe(data => {
  //       this.pigList = data;
  //       console.log(this.pigList);
  //     });
  //   }
  //
  //   this.treatmentForm = this.fb.group({
  //     id: [this.data.id],
  //     description: [this.data.description],
  //     isDeleted: [0],
  //     treatDate: [this.data.treatDate],
  //     type: ['vacxin'],
  //     veterinary: [this.data.veterinary],
  //     cote: [this.data.cote],
  //     pig: [this.data.pig],
  //     diseases: [this.data.diseases],
  //     vacxin: [this.data.vacxin]
  //   })
  //
  // }
  //
  // onSubmit() {
  //   console.log(this.checkCoteCode);
  //   this.toastr.success('Delete successfully', 'C04piggy');
  //   this.refeshComponent();
  //   this.activeModal.close();
  // }
  //
  // check(coteId) {
  //   this.checkCoteCode.id = coteId;
  //   this.ngOnInit();
  // }
  // refeshComponent(){
  //   const currentRoute = this.router.url;
  //   this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
  //     this.router.navigate([currentRoute]);
  //   });
  }
}

