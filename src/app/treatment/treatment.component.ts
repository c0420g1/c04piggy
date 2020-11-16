import {Component, Input, OnInit} from '@angular/core';
import {TreatmentService} from '../service/treatment.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {TreatmentVacxins} from '../model/TreatmentVacxins';
import {LoadCssService} from '../load-css.service';
import {Cote} from '../model/Cote';
import {Pig} from '../model/Pig';


@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {
  columnHeader = {'select': 'Select', 'No.': 'No.','treatDate': 'Date', 'coteCode': 'Cote Code', 'pigCode': 'Pig Code',
                  'veterinarian': 'Veterinarians' ,'diseases': 'Diseases','vacxin': 'Medicine', 'action': 'Action'};
  constructor(public treatmentService: TreatmentService, private loadCssService: LoadCssService) { }

  ngOnInit(): void {
  }
  onAddEdit(element, modal) {
    const modalRef = modal.open(TreatmentModal);
    modalRef.componentInstance.data = element ?? new TreatmentVacxins();
    modalRef.componentInstance.title = element ? 'Edit Information' : 'Add Information';
  }
  onView(element, modal){
    const modalRef = modal.open(TreatmentModal);
    modalRef.componentInstance.data = element ?? new TreatmentVacxins();
  }
  onAction(element, modal){
    console.log(element)
    const modalRef = modal.open(TreatmentModal);
    modalRef.componentInstance.data = element ?? new TreatmentVacxins();
  }
}


@Component({
  templateUrl: './treatment-modal.html'
})
export class TreatmentModal implements OnInit{
  @Input() data;
  @Input() title;
  coteList: Cote[] = [];
  pigList: Pig[] = [];
  treatmentForm: FormGroup;
  checkCoteCode: Cote;
  coteId = 1;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router,
              private treatmentService: TreatmentService,){}

  ngOnInit(): void {
    this.treatmentService.getAllCote().subscribe(data => {
      this.coteList = data;
    })
    if (this.checkCoteCode != null){
      this.treatmentService.getPigByCoteId(this.checkCoteCode.id).subscribe(data => {
        this.pigList = data;
        console.log(this.pigList);
      });
    }

    // this.coteId = this.checkCoteCode.id
    this.treatmentForm = this.fb.group({
      id: [this.data.id],
      description: [this.data.description],
      isDeleted: [0],
      treatDate: [this.data.treatDate],
      type: ['treatment'],
      veterinary: [this.data.veterinary],
      cote: [this.data.cote],
      pig: [this.data.pig],
      diseases: [this.data.diseases],
      vacxin: [this.data.vacxin]
    })

  }

  onSubmit() {
    console.log(this.checkCoteCode);
  }

  check(coteId) {
    this.checkCoteCode.id = coteId;
    this.ngOnInit();
  }
}
