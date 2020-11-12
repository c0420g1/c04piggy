import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {HistoryExportService} from '../service/history-export.service';
import {HistoryExport} from '../model/HistoryExport';

@Component({
  selector: 'app-history-export',
  templateUrl: './history-export.component.html',
  styleUrls: ['./history-export.component.css']
})
export class HistoryExportComponent implements OnInit {
   coteExport: HistoryExport[];
  constructor(public historyExportService: HistoryExportService) { }

  ngOnInit(): void {
    this.historyExportService.getAll().subscribe(
        data => {
          this.coteExport = data,
          console.log(this.coteExport);
        },error => console.log(error)
    )
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
