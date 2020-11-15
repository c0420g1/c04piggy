import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Notification } from '../model/Notification';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  // actionName: string= "Export";
  columnHeader = {'title': 'Title', 'content': 'Content' , 'action': 'Action'};
  constructor(public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onAddEdit(element, modal) {
    // const modalRef = modal.open(NotificationModal);
    // modalRef.componentInstance.data = element ?? new Notification();
    // modalRef.componentInstance.title = element ? 'edit' : 'add';
  }

  // onView(element, modal){
  //   alert(element);
  // }

  // onAction(element, modal){
  //   console.log(element);
  // }
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
    this.notificationForm = this.fb.group({
      id: this.data.id,
      title: [this.data.title],
      content: [this.data.content]
    });
  }

  onSubmit(){}
}
