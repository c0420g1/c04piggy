import {Component, Input, OnInit} from '@angular/core';
import {TreatmentService} from '../service/treatment.service';
import {TreatmentDTO} from '../model/TreatmentDTO';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {TreatmentVacxins} from '../model/TreatmentVacxins';
import {NotificationModal} from '../notification/notification.component';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {
  search = '';
  pageNum = 1;
  treatmentListDTO: TreatmentDTO[] = [];
  treatment: TreatmentVacxins;
  constructor(private treatmentService: TreatmentService) { }

  ngOnInit(): void {
    this.treatmentService.getAll(this.pageNum, this.search,'treatment').subscribe(data =>{
      this.treatmentListDTO = data;
      console.log(this.treatmentListDTO);
    })
  }

  changeSearch() {
    this.ngOnInit();
  }

  editTreatment(id) {
    // this.treatmentService
  }

  addTreatment(element,modal) {
    const modalRef = modal.open(NotificationModal);
  }
}


@Component({
  templateUrl: './treatment-modal.html'
})
export class TreatmentModal implements OnInit{
  @Input() data;
  treatmentForm: FormGroup;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.treatmentForm = this.fb.group({
      id: [this.data.id]
    })
  }

}
