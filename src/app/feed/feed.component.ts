import {Component, Input, OnInit} from '@angular/core';
import {FeedService} from '../service/feed.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  columnHeader = { 'id': 'ID', 'amount': 'Amount' , 'code': 'Code','unit' : 'Unit','feedTypeName': 'FeedType','herdName':'Herd'};
  constructor(public feedService: FeedService) { }

  ngOnInit(): void {
  }

  onAddClick() {
    const modalRef = modal.open(FeedModal);
    modalRef.componentInstance.title = 'Feed Manager';
  }

}

@Component({
  templateUrl: './feed-modal.html'
})
export class FeedModal implements OnInit {
  @Input() data;
  @Input() title;
  feedForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.feedForm = this.fb.group({
      id: this.data.id,
      title: [this.data.title],
      content: [this.data.content]
    });
  }

  onSubmit(){}
}
