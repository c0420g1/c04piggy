import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Notification} from '../model/Notification';
import {NotificationService} from '../service/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    // actionName: string= "Export";
    columnHeader = {'title': 'Title', 'createDate': 'Date of Post', 'content': 'Content', 'action': 'Action','type':'Type','employeeId': 'Employee Id'};

    constructor(public notificationService: NotificationService) {
    }

    ngOnInit(): void {
    }

    onAddEdit(element, modal) {
        const modalRef = modal.open(NotificationModal);
        modalRef.componentInstance.data = element ?? new Notification();
        modalRef.componentInstance.title = element ? 'EDIT NOTE' : 'ADD NOTE';
    }
}


@Component({
    templateUrl: './notification-modal.html'
})
export class NotificationModal implements OnInit {
    @Input() data;
    @Input() title;
    addNewNotificationForm: FormGroup;
    notification: Notification;
    constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router,
                private notificationService: NotificationService) {
    }

    ngOnInit(): void {
        this.addNewNotificationForm = this.fb.group({
            id: this.data.id,
            title: [this.data.title],
            createDate: [this.data.createDate],
            content: [this.data.content],
            type: [this.data.type],
            employeeId: [this.data.employeeId]
        });
    }

    onSubmit(form: FormGroup) {


            this.notificationService.addEdit(form.value).subscribe(()=> this.ngOnInit());

        window.location.reload();
        }


}
