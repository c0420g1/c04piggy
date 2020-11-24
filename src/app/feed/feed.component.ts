import {Component, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FeedService} from '../service/feed.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Feed} from '../model/Feed';
import {FeedType} from '../model/FeedType';
import {Herd} from '../model/Herd';
import {Error1 } from '../model/error1';
import {Observable, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';
import {delay} from 'rxjs/operators';


@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
    columnHeader = {
        'amount': 'Amount (kg)',
        'code': 'Code',
        'unit': 'Unit (kg/)',
        'feedTypeName': 'FeedType',
        'herdName': 'Herd',
        'Action': 'Action'
    };
     items =  [];

    constructor(public feedService: FeedService) {
    }


    ngOnInit(): void {

        this.feedService.getAllFeedType().subscribe(
            data => {
               this.items = data;
               console.log(this.items);
            } , error => {
                    this.items = [];
                });


    }


    onAddClick(element, modal) {
      const modalRef = modal.open(FeedModal);
              modalRef.componentInstance.title = element ? 'Edit Feed' : 'Add Feed';
              modalRef.componentInstance.data = element ?? new Feed();
              modalRef.componentInstance.feedType = this.items;
    }

}

@Component({
    templateUrl: './feed-modal.html',
    styleUrls: ['./feed.component.css']
})
export class FeedModal implements OnInit {
    @Input() data;
    @Input() title;
    @Input() feedType;
    feedForm: FormGroup;
    Herd: Herd[];
    feeds: Feed[];
    herd1 = new Herd();
    feedType1 = new FeedType();
    error1s: Error1[];
    @ViewChild('inputAmount') inputAmount: ElementRef;
    @ViewChild('inputUnit') inputUnit: ElementRef;
    @ViewChild('inputDescription') inputDescription: ElementRef;
    @ViewChild('inputCode') inputCode: ElementRef;
    feedType1$: FeedType[];
    feedType$ : Observable<FeedType[]>;
    selectedPersonId : string;
    unit : string;


  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router, public feedService: FeedService, private toast: ToastrService) {

    }

    ngOnInit(): void {
        this.feedType$ = this.getAllFeedTypeSearch();
        this.unit = this.data.unit;

        this.feedForm = this.fb.group({
            id: [this.data.id],
            description: [this.data.description],
            amount: [this.data.amount, [Validators.required, Validators.pattern('^[\\d\\s]+$')]],
            code: [this.data.code,  [Validators.required, Validators.pattern('^(FE)[\\d]{4}$')]],
            unit: [this.data.unit,  [Validators.required, Validators.pattern('ngay|tuan|thang')]],
            feedType: [this.data.feedType,  [Validators.required]],
            herd: [this.data.herd, [Validators.required]],
        });

        this.feedService.getFeed().subscribe(next => (this.feeds = next, this.feeds.forEach(e => {
          if (this.data.id == e.id){
            this.data = e;
            this.herd1 = e.herd;
            this.feedType1 = e.feedType;
          }
        })) , error => (this.feeds = []));

        this.feedService.getAllFeedType().subscribe(next => (this.feedType1$ = next), error => (this.feedType1$ = []));



        this.feedService.getAllHerd().subscribe(next => (this.Herd = next), error => (this.Herd = []));

        setTimeout(() => {
            this.inputAmount.nativeElement.focus();
        });
    }



    onSubmit() {
        if(this.feedForm.valid)
        {
            const {value} = this.feedForm;
            this.feedService.addEdit(value).subscribe(
                next => {
                    this.error1s = next;
                    this.error1s.forEach(e => {
                        if (e.fileName == 'amount'){
                            this.inputAmount.nativeElement.focus();
                        }
                        if (e.fileName == 'unit'){
                            this.inputUnit.nativeElement.focus();
                        }
                        if (e.fileName == 'description'){
                            this.inputDescription.nativeElement.focus();
                        }
                        if (e.fileName == 'code'){
                            this.inputCode.nativeElement.focus();
                        }
                        if (e.fileName == 'success'){
                            this.feedForm.reset();
                            this.activeModal.close();
                            this.toast.success('Feed Add', 'update success');
                            this.refeshComponent();
                        }
                    });
                }, error => console.log(error)
            );
        }

    }
    refeshComponent(){
        const currentRoute = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
            this.router.navigate([currentRoute]);
        });
    }


    getAllFeedTypeSearch(term: string = null): Observable<FeedType[]> {
                if (term) {
                    this.feedType = this.feedType.filter(x => x.name.toLocaleLowerCase().indexOf(term.toLocaleLowerCase()) > -1);
                }
        return of(this.feedType).pipe(delay(2500));
    }
}
