import {Component, Input, OnInit} from '@angular/core';
import {TreatmentService} from '../service/treatment.service';
import {TreatmentDTO} from '../model/TreatmentDTO';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {TreatmentVacxins} from '../model/TreatmentVacxins';
import {NotificationModal} from '../notification/notification.component';
import {LoadCssService} from '../load-css.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {
  columnHeader = {'select': 'Select', 'treatDate': 'Date', 'coteCode': 'Cote Code', 'pigCode': 'Pig Code',
                  'veterinarian': 'Veterinarians' ,'diseases': 'Diseases','vacxin': 'Medicine', 'action': 'Action'};
  actionName = 'import';
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
  treatmentForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
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

  }
}
