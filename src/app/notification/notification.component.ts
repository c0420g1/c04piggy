import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Notification} from '../model/Notification';
import {NotificationService} from '../service/notification.service';
import {ToastrService} from 'ngx-toastr';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/Employee';
import { Global } from '../model/Global';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    columnHeader = {'title': 'Title','createdBy' : 'Created By',  'createDate': 'Date of Post', 'type':'Type', 'content': 'Content', 'action': 'Action'};

    constructor(public notificationService: NotificationService) {
    }

    ngOnInit(): void {
    }

    onAddEdit(element, modal) {
        const modalRef = modal.open(NotificationModal);
        modalRef.componentInstance.data = element ?? new Notification();
        modalRef.componentInstance.title = element ? 'Edit Nofification' : 'Add Notification';
    }
}


@Component({
    templateUrl: './notification-modal.html'
})
export class NotificationModal implements OnInit {
    @Input() data;
    @Input() title;
    addNewNotificationForm: FormGroup;
    dropdownList= [];
    selectedItems = [];
    dropdownSettings = {};
    constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router,
                private notificationService: NotificationService, private toastr: ToastrService,
                private employeeService: EmployeeService, private datepipe: DatePipe) {
    }

    
    ngOnInit(): void {
        this.employeeService.getAllEmployee().subscribe(r => {r.forEach(e=>{
    this.dropdownList.push(  {"id": e.id,"itemName":e.name});
});
    });

    this.selectedItems = this.data.employees;
        this.dropdownSettings = { 
                                  singleSelection: false, 
                                  text:"Select Employees",
                                  selectAllText:'Select All',
                                  unSelectAllText:'UnSelect All',
                                  enableSearchFilter: false,
                                  classes:"myclass custom-class"
                                };          
                                
                                const currentDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
                                this.addNewNotificationForm = this.fb.group({
                                    id: [this.data.id],
                                    title: [this.data.title],
                                    createById: [Global.employeeId],
                                    createDate: [currentDate],    
                                    content: [this.data.content, Validators.required],
                                    type: [this.data.type, Validators.required],
                                    employees: [[], Validators.required]
                                });
    }

    refeshComponent(){
        const currentRoute = this.router.url;
        this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
            this.router.navigate([currentRoute]);
        });
    }
    onSubmit() {
        this.notificationService.addEdit(this.addNewNotificationForm.value).subscribe();
        this.toastr.success(this.title== 'Add Notification' ? 'Added successfully' : "Edited succsessful", 'Notification')
        this.refeshComponent();
        this.activeModal.close();
        }
}
