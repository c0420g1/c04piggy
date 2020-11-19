import {Component, Input, OnInit} from '@angular/core';
import {TreatmentService} from '../service/treatment.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {TreatmentVacxins} from '../model/TreatmentVacxins';
import {LoadCssService} from '../load-css.service';
import {Cote} from '../model/Cote';
import {Pig} from '../model/Pig';
import {Diseases} from '../model/Diseases';
import {Vaccine} from '../model/Vaccine';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {
  columnHeader = {'treatDate': 'Date', 'coteCode': 'Cote Code', 'pigCode': 'Pig Code',
                  'veterinarian': 'Veterinarians' ,'diseases': 'Diseases','vacxin': 'Medicine', 'action': 'Action'};
  tableName = 'Examination & Treatment Information';
  constructor(public treatmentService: TreatmentService, private loadCssService: LoadCssService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }
  onAddEdit(element, modal) {
    const modalRef = modal.open(TreatmentModal);
    modalRef.componentInstance.data = element ?? new TreatmentVacxins();
    modalRef.componentInstance.title = element ? 'Edit Information' : 'Add Information';
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
  checkCoteCode = new Cote();
  checkPigCode = new Pig();
  checkDiseases = new Diseases();
  checkVaccine = new Vaccine();

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router,
              private treatmentService: TreatmentService, private toastr: ToastrService){}


  ngOnInit(): void {
    console.log(this.data)
    this.treatmentService.getTreatmentById(this.data.id).subscribe(data => {
      this.data = data;
      this.checkCoteCode = data.cote;
      this.checkPigCode = data.pig;
      this.checkDiseases = data.diseases;
      this.checkVaccine = data.vacxin;
      console.log(this.checkVaccine);
      console.log(this.checkDiseases);
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
      treatDate: ['', [Validators.required, Validators.pattern('^\\d{4}\\-(0?[1-9]|1[012])\\-(0?[1-9]|[12][0-9]|3[01])$'),dateValidator.bind(this)]],
      type: ['treatment'],
      veterinary: [''],
      cote: ['', Validators.required],
      pig: ['', Validators.required],
      diseases: ['', Validators.required],
      vacxin: ['', Validators.required]
    });

  }

  onSubmit() {
    console.log(this.treatmentForm.value);

   this.treatmentService.addEditTreatment(this.treatmentForm.value).subscribe(data => {
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
function dateValidator(formControl: FormControl) {
  let date1: string[];
  date1 = formControl.value.split('-');
  const o_date = new Intl.DateTimeFormat;
  const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
  const m_date = o_date.formatToParts().reduce(f_date, {});
  let dateNumber = (parseInt(date1[0]) * 365) + (parseInt(date1[1]) * 30) + (parseInt(date1[2])) ;
  let dateNumberNow = (parseInt(m_date.year) * 365) + (parseInt(m_date.month) * 30) + (parseInt(m_date.day)) ;
  if (dateNumber > dateNumberNow) {
    return {checkDate: true};
  }

  return null;

}
