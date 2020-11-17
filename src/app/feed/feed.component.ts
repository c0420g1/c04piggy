import {Component, Input, OnInit} from '@angular/core';
import {FeedService} from '../service/feed.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Feed} from '../model/Feed';
import {FeedType} from '../model/FeedType';
import {Herd} from '../model/Herd';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
    columnHeader = {
        'id': 'ID',
        'amount': 'Amount',
        'code': 'Code',
        'unit': 'Unit',
        'feedTypeName': 'FeedType',
        'herdName': 'Herd',
        'Action': 'Action'
    };

    constructor(public feedService: FeedService) {
    }


    ngOnInit(): void {


    }

    onAddClick(element, modal) {
      const modalRef = modal.open(FeedModal);
              modalRef.componentInstance.title = element ? 'Edit Feed' : 'Add Feed';
              modalRef.componentInstance.data = element ?? new Feed();
    }

}

@Component({
    templateUrl: './feed-modal.html',
    styleUrls: ['./feed.component.css']
})
export class FeedModal implements OnInit {
    @Input() data;
    @Input() title;
    feedForm: FormGroup;
    FeedType: FeedType[];
    Herd: Herd[];
    feeds: Feed[];
    herd1 = new Herd();
    feedType1 = new FeedType();



  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router, public feedService: FeedService) {

    }

    ngOnInit(): void {
        this.feedForm = this.fb.group({
            id: [this.data.id],
            description: [this.data.description],
            amount: [this.data.amount],
            code: [this.data.code],
            unit: [this.data.unit],
            feedType: [this.data.feedType],
            herd: [this.data.herd],
        });

        this.feedService.getFeed().subscribe(next => (this.feeds = next, this.feeds.forEach(e => {
          if(this.data.id == e.id){
            this.data = e;
            this.herd1 = e.herd;
            this.feedType1 = e.feedType;
          }
        })) , error => (this.feeds = []));

        this.feedService.getAllFeedType().subscribe(next => (this.FeedType = next), error => (this.FeedType = []));

        this.feedService.getAllHerd().subscribe(next => (this.Herd = next), error => (this.Herd = []));

    }

    onSubmit() {
        const {value} = this.feedForm;
        console.log(this.feedForm)
        this.feedService.addEdit(value).subscribe(
            next => {
                const data = next;
                console.log(data);
                this.feedForm.reset();
                window.location.reload();
            }
        ), error => console.log(error);

    }
}
