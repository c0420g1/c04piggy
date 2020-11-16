import {Component, Input, OnInit} from '@angular/core';
import {TreatmentService} from '../service/treatment.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {TreatmentVacxins} from '../model/TreatmentVacxins';
import {LoadCssService} from '../load-css.service';
import {Cote} from '../model/Cote';
import {Pig} from '../model/Pig';
import {Diseases} from '../model/Diseases';
import {Vaccine} from '../model/Vaccine';


@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {
  columnHeader = {'treatDate': 'Date', 'coteCode': 'Cote Code', 'pigCode': 'Pig Code',
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
  diseasesList: Diseases[] = [];
  medicineList: Vaccine[] = [];
  treatmentForm: FormGroup;
  checkCoteCode: Cote = null;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router,
              private treatmentService: TreatmentService,){}

  ngOnInit(): void {
    console.log(this.data)
    this.treatmentService.getTreatmentById(this.data.id).subscribe(data => {
      this.data = data;
      console.log(this.data.veterinary);
      this.treatmentForm.patchValue(data);
    })
    this.treatmentService.getAllCote().subscribe(data => {
      this.coteList = data;
    })
    this.treatmentService.getAllDiseases().subscribe(data => {
      this.diseasesList = data;
    })
    this.treatmentService.getAllMedicne().subscribe(data => {
      this.medicineList = data;
    })
    if (this.checkCoteCode != null){
      this.treatmentService.getPigByCoteId(this.checkCoteCode.id).subscribe(data => {
        this.pigList = data;
        console.log(this.pigList);
      });
    }

    // this.coteId = this.checkCoteCode.id
    this.treatmentForm = this.fb.group({
      id: [''],
      description: [''],
      isDeleted: [0],
      treatDate: [''],
      type: ['treatment'],
      veterinary: [''],
      cote: [this.data.cote],
      pig: [''],
      diseases: [''],
      vacxin: ['']
    })

  }

  onSubmit() {
    console.log(this.treatmentForm.value);
   this.treatmentService.addEditTreatment(this.treatmentForm.value).subscribe(data => {
     console.log(data);
   })
  }

  check(coteId) {
    this.checkCoteCode.id = coteId;
    if (this.checkCoteCode != null) {
      this.treatmentService.getPigByCoteId(this.checkCoteCode.id).subscribe(data => {
        this.pigList = data;
        console.log(this.pigList);
      });
    }
  }
}
