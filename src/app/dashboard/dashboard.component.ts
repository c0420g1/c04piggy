import { Component, OnInit } from '@angular/core';
import {LoadCssService} from '../load-css.service';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private loadCssService: LoadCssService) { }

  ngOnInit(): void {
  }

}
