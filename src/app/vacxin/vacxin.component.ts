import { Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Cote } from '../model/Cote';
import { Pig } from '../model/Pig';
import { TreatmentVacxins } from '../model/TreatmentVacxins';
import { VacxinService } from '../service/vacxin.service';
import {Diseases} from '../model/Diseases';
import {TreatmentService} from '../service/treatment.service';

@Component({
  selector: 'app-vacxin',
  templateUrl: './vacxin.component.html',
  styleUrls: ['./vacxin.component.css']
})
export class VacxinComponent implements OnInit {
  columnHeader = {'treatDate': 'Date', 'coteCode': 'Cote Code','veterinarian': 'Veterinarians' ,'diseases': 'Vaccine Type', 'action': 'Action'};
  tableName = 'Vaccination Information';
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
  diseasesList: Diseases[] = [];
  vaccineForm: FormGroup;
  checkCoteCode = new Cote();
  checkDiseases = new Diseases();
  coteId = 1;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router,
              private vacxinService: VacxinService, private toastr: ToastrService,private treatmentService: TreatmentService){}

  ngOnInit(): void {
    console.log(this.data);
    this.treatmentService.getTreatmentById(this.data.id).subscribe(data => {
      this.data = data;
      this.checkCoteCode = data.cote;
      this.checkDiseases = data.diseases;
      this.vaccineForm.patchValue(data);
    })
    this.vacxinService.getAllCote().subscribe(data => {
      this.coteList = data;
    })
    this.treatmentService.getAllDiseases().subscribe(data => {
      this.diseasesList = data;
    })
    this.vaccineForm = this.fb.group({
      id: [''],
      description: ['',Validators.required],
      isDeleted: [0],
      treatDate: ['',[Validators.required,dateValidator.bind(this)]],
      type: ['vacxin'],
      veterinary: ['',Validators.required],
      cote: ['',Validators.required],
      pig: [this.data.pig],
      diseases: ['',Validators.required],
      vacxin: [this.data.vacxin]
    })

  }

  onSubmit() {
    console.log(this.vaccineForm.value);
    this.treatmentService.addEditTreatment(this.vaccineForm.value).subscribe(data => {
      console.log(data);
      this.toastr.success('Save Information successfully', 'Treatment')
    })
    this.refeshComponent();
    this.activeModal.close();
  }

  refeshComponent(){
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
}

function dateValidator(formControl: FormControl) {
  // if(formControl.value == undefined) {
  //   return null;
  // }
  let date1: string[];
  date1 = formControl.value.split('-');
  const o_date = new Intl.DateTimeFormat;
  const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
  const m_date = o_date.formatToParts().reduce(f_date, {});
  let dateNumber = (parseInt(date1[0]) * 365) + (parseInt(date1[1]) * 30) + (parseInt(date1[2])) ;
  let dateNumberNow = (parseInt(m_date.year) * 365) + (parseInt(m_date.month) * 30) + (parseInt(m_date.day)) ;
  if (dateNumber < dateNumberNow) {
    return {checkDate: true};
  }

  return null;

}
