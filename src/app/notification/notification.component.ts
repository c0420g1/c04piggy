import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../service/notification.service';
import { Notification } from '../model/Notification';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  columnHeader = {'select':'Select', 'title': 'Title', 'content': 'Content' , 'action': 'Action'};
  constructor(public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onAddEdit(element, modal) {
    const modalRef = modal.open(NotificationModal);
    modalRef.componentInstance.data = element ?? new Notification();
    modalRef.componentInstance.title = element ?  'Edit' : 'Add';
  }
}


@Component({
  templateUrl: './notification-modal.html'
})
export class NotificationModal implements OnInit {
  @Input() data;
  @Input() title;
  notificationForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.notificationForm= this.fb.group({
      id: this.data.id,
      title: [this.data.title],
      content: [this.data.content]
    });
  }

  onSubmit(){}
}
