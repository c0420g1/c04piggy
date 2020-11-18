import {Component, OnInit} from '@angular/core';
import {Cote} from '../model/Cote';
import {CoteService} from '../service/cote.service';
import {CoteDTO} from '../model/CoteDTO';
import {Form, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators, AbstractControl} from '@angular/forms';
import {Account} from '../model/Account';
import {Herd} from '../model/Herd';
import {EmployeeService} from '../service/employee.service';
import {Employee} from '../model/Employee';
import {PigService} from '../service/pig.service';
import {Pig} from '../model/Pig';
import {HistoryExportService} from '../service/history-export.service';
import {HistoryExport} from '../model/HistoryExport';
import {DatePipe} from '@angular/common';
import {Stock} from '../model/Stock';

@Component({
    selector: 'app-cote',
    templateUrl: './cote.component.html',
    styleUrls: ['./cote.component.css']
})
export class CoteComponent implements OnInit {
    variableFind = '';
    coteList: CoteDTO[] = [];
    employeeList: Employee[] = [];
    herdList: Herd[] = [];
    message: string;
    pigList: Pig[] = [];

    // Pagination
    currentPage = 1;
    entityNumber: number;
    totalEntities: number;
    totalPage: number;
    jumpPage: number;
    // Pagination
    addNewCoteForm: FormGroup;


    //phần dưới này là các biến của hiếu
    historyExport: FormGroup;
    ids: string = '';
    currentDate: string;
    pigsListSoldIds = '';
    idSoldPig: number[] = [];
    idPig: number;

    constructor(private coteService: CoteService,
                private fb: FormBuilder,
                private employeeService: EmployeeService,
                private pigService: PigService,
                private historyService: HistoryExportService,
                private datePipe: DatePipe
    ) {
    }

    ngOnInit(): void {
        const dateCur = new Date();
        this.currentDate = this.datePipe.transform(dateCur, 'yyyy-MM-dd');


        this.coteService.getListCote(this.variableFind).subscribe((data) => {
            this.totalEntities = data.length;
            this.totalPage = this.totalEntities / 10;
        });

        this.coteService.getAllCote(this.currentPage, this.variableFind).subscribe((data) => {
            if (data.length === 0) {
                this.message = 'Not found any cote, try again!';
            } else {
                this.message = '';
            }
            this.entityNumber = data.length;
            this.coteList = data;
        });

        this.employeeService.getAllEmployee().subscribe((employees) => {
            this.employeeList = employees;
        });
        this.pigService.getListHerd().subscribe((herds) => {
            this.herdList = herds;
        });

        this.addNewCoteForm = this.fb.group({
            id: [''],
            description: [''],
            isDeleted: [''],
            code: ['', Validators.required],
            dateGroup: this.fb.group({
                importDate: ['', [Validators.required, importDayCheckValidator]],
                exportDate: ['', Validators.required]
            }, {validators: exportDayCheckValidator}),

            quantity: [''],
            type: [''],
            employee: Employee,
            herd: Herd,
        });

        this.historyExport = this.fb.group({
            id: [''],
            isDeleted: [''],
            description: [''],
            type: [''],
            quantity: [''],
            unit: [''],
            company: ['', Validators.required],
            receivedEmployeeId: [''],
            exportDate: [this.currentDate],
            stock: Stock,
            cote: Cote,
            employee: Employee
        });
    }

    search() {
        this.currentPage = 1;
        this.ngOnInit();
    }

    prePage(): void {
        if (this.currentPage >= 2) {
            this.currentPage--;
            this.jumpPage = this.currentPage;
        }
        this.ngOnInit();
    }

    nexPage(): void {
        if (this.currentPage < this.totalEntities / 10) {
            this.currentPage++;
            this.jumpPage = this.currentPage;
        }
        console.log(this.currentPage);
        this.ngOnInit();
    }

    goToPage() {
        this.currentPage = this.jumpPage;
        this.ngOnInit();
    }

    AddNewCote(form: FormGroup) {
        this.coteService.addNewCote(form.value).subscribe(() => this.ngOnInit());
        document.getElementById('add').click();
    }

    getInfo(cote: CoteDTO) {
        this.coteService.getListPig(cote.herdName).subscribe((data) => this.pigList = data);
        console.log(this.pigList);
    }

















       //====================================//
    // creator Hieu
    soldPig() {
        this.historyService.soldPigs(this.pigsListSoldIds, this.historyExport.value).subscribe(
            () => {
            }, error => console.log('error export!')
        );
        this.ngOnInit();
    }

    addIdPigSold(id: number) {
        this.idPig = id;
    }

    getAllIdPigs(pigs: Pig[]) {
        this.idSoldPig = [];
        this.pigsListSoldIds = '';

        for (let i = 0; i < pigs.length; i++) {
            this.idSoldPig.push(pigs[i].id);
        }
        for (let i = 0; i < this.idSoldPig.length; i++) {
            this.pigsListSoldIds += this.idSoldPig[i] + ',';
        }
    }

    sold1Pig() {
        this.historyService.soldPigs(""+this.idPig+"", this.historyExport.value).subscribe(
            () => {
                console.log(this.historyExport.value);
            }, error => console.log('error export!')
        );
        this.ngOnInit();
    }

    //==========================// Hiếu
}

// Customer Validator ImportDay

function importDayCheckValidator(control: AbstractControl) {
    const currentDay = new Date();
    const day = new Date(control.value);
    if (day >= currentDay || (day.getFullYear() == day.getFullYear() && day.getMonth() == currentDay.getMonth() && day.getDay() == currentDay.getDay())) {
        return null;
    }
    return {
        importDay: true
    };
}

function exportDayCheckValidator(control: AbstractControl) {
    const day = new Date(control.value.exportDate);
    const dayCheck = new Date(control.value.importDate);
    // @ts-ignore
    const check = Math.round(Math.abs((day - dayCheck) / (24 * 60 * 60 * 1000)));
    // @ts-ignore
    if (dayCheck != 0) {
        return null;
    }
    return {
        exportDay: true
    };
}
