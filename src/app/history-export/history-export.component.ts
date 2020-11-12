import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {HistoryExport} from '../model/HistoryExport';
import {HistoryExportService} from '../service/history-export.service';

@Component({
  selector: 'app-history-export',
  templateUrl: './history-export.component.html',
  styleUrls: ['./history-export.component.css']
})
export class HistoryExportComponent implements OnInit {
   coteExport: HistoryExport[];
   idDel = [];
   pageNum = 1;
   search =  "";


  constructor(public historyExportService: HistoryExportService) { }

  ngOnInit(): void {
    this.historyExportService.getAll(this.pageNum, this.search).subscribe(
        data => {
          this.coteExport = data;
        },error => console.log(error)
    )
  }


  getIdDelete(id: number) {
    this.idDel.push(id)
  }

  delete() {
    this.historyExportService.delete(this.idDel);
    this.ngOnInit();
  }

  searching() {
    console.log(this.search);
    this.ngOnInit();
  }
}


@Component({
  templateUrl: './HistoryExport-Modal.html'
})
export class HistoryExportModal implements OnInit {
  @Input() data;
  @Input() title;
  historyExportForm: FormGroup;

  constructor(public activeModal: NgbActiveModal, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.historyExportForm= this.fb.group({
      id: this.data.id,
      title: [this.data.title],
      content: [this.data.content]
    });
  }

  onSubmit(){}
}
