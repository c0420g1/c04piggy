import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Notification} from '../model/Notification';
import {NotificationService} from '../service/notification.service';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
    ngOnInit(){
        this.dropdownList = [
                              {"id":1,"itemName":"India"},
                              {"id":2,"itemName":"Singapore"},
                              {"id":3,"itemName":"Australia"},
                              {"id":4,"itemName":"Canada"},
                              {"id":5,"itemName":"South Korea"},
                              {"id":6,"itemName":"Germany"},
                              {"id":7,"itemName":"France"},
                              {"id":8,"itemName":"Russia"},
                              {"id":9,"itemName":"Italy"},
                              {"id":10,"itemName":"Sweden"}
                            ];
        this.selectedItems = [
                                {"id":2,"itemName":"Singapore"},
                                {"id":3,"itemName":"Australia"},
                                {"id":4,"itemName":"Canada"},
                                {"id":5,"itemName":"South Korea"}
                            ];
        this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Select Countries",
                                  selectAllText:'Select All',
                                  unSelectAllText:'UnSelect All',
                                  enableSearchFilter: true,
                                  classes:"myclass custom-class"
                                };            
    }
    onItemSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item:any){
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any){
        console.log(items);
    }
    onDeSelectAll(items: any){
        console.log(items);
    }


    // actionName: string= "Export";
    // columnHeader = {'title': 'Title', 'createDate': 'Date of Post', 'content': 'Content','type':'Type', 'action': 'Action'};

    // constructor(public notificationService: NotificationService) {
    // }

    // ngOnInit(): void {
    // }

    // onAddEdit(element, modal) {
    //     const modalRef = modal.open(NotificationModal);
    //     modalRef.componentInstance.data = element ?? new Notification();
    //     modalRef.componentInstance.title = element ? 'Edit Nofification' : 'Add Notification';
    //     modalRef.componentInstance.employeeName = element ? element.employee.name : '';
    // }
}


@Component({
    templateUrl: './notification-modal.html'
})
export class NotificationModal implements OnInit {
    @Input() data;
    @Input() title;
    @Input() employeeName;
    addNewNotificationForm: FormGroup;
    notification: Notification;
    constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router,
                private notificationService: NotificationService, private toastr: ToastrService) {
    }

    ngOnInit(): void {
        this.addNewNotificationForm = this.fb.group({
            id: this.data.id,
            title: [this.data.title],
            createDate: [this.data.createDate],
            content: [this.data.content],
            type: [this.data.type],
            employeeName: [this.employeeName]
        });
    }


    refeshComponent(){
        const currentRoute = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
            this.router.navigate([currentRoute]);
        });
    }
    onSubmit(form: FormGroup) {


        this.notificationService.addEdit(form.value).subscribe(()=> this.ngOnInit());
        this.toastr.success('Add new Information successfully', 'Treatment')
        this.refeshComponent();
        this.activeModal.close();
        }


}
