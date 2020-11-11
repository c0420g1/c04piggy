import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  columnHeader = { 'title': 'Title', 'content': 'Content' , 'action': 'Action'};
  constructor(public notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  onEditClick(element, modal) {
    const modalRef = modal.open(NotificationModal);
    modalRef.componentInstance.data = element;
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
