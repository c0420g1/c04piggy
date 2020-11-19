import {Component, Input, OnInit} from '@angular/core';
import {HerdService} from '../service/herd.service';
import {LoadCssService} from '../load-css.service';
import {Herd} from '../model/Herd';
import {Cote} from '../model/Cote';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {TreatmentService} from '../service/treatment.service';
import {Feed} from '../model/Feed';
import {FeedService} from '../service/feed.service';

@Component({
  selector: 'app-herd',
  templateUrl: './herd.component.html',
  styleUrls: ['./herd.component.css']
})
export class HerdComponent implements OnInit {
  columnHeader = { 'description': 'Description', 'name': 'Herd Name', 'action': 'Action'};

  constructor(public herdService: HerdService, private loadCssService: LoadCssService) { }

  ngOnInit(): void {
  }

  onAddEdit(element, modal) {
    const modalRef = modal.open(HerdModal);
    modalRef.componentInstance.data = element ?? new Herd();
    modalRef.componentInstance.title = element ? 'Edit Information' : 'Add Information';
  }
  onView(element, modal){
    const modalRef = modal.open(HerdModal);
    modalRef.componentInstance.data = element ?? new Herd();
  }
  onAction(element, modal){
    console.log(element);
    const modalRef = modal.open(HerdModal);
    modalRef.componentInstance.data = element ?? new Herd();
  }
}


@Component({
  templateUrl: './herd-modal.html',
})
export class HerdModal implements OnInit{
  @Input() data;
  @Input() title;
  coteList: Cote[] = [];
  feedList: Feed[] = [];
  herdForm: FormGroup;
  checkCoteCode: Cote;
  coteId = 1;
  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router,
              private herdService: HerdService, private treatmentService: TreatmentService, private feedService: FeedService ){}

  ngOnInit(): void {
    this.treatmentService.getAllCote().subscribe(data => {
      this.coteList = data;
    });
    this.feedService.getAll().subscribe(data => {
      this.feedList = data;
    });

    // this.coteId = this.checkCoteCode.id
    this.herdForm = this.fb.group({
      id: [this.data.id],
      description: [this.data.description],
      isDeleted: [0],
      name: [''],
      feed: Feed,
      cote: Cote,
    });

  }

  onSubmit() {
    console.log(this.checkCoteCode);
  }

  check(coteId) {
    this.checkCoteCode.id = coteId;
    this.ngOnInit();
  }

}
