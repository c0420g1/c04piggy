import { Component, OnInit } from '@angular/core';
import {LoadCssService} from '../load-css.service';
declare var $: any;
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private loadCssService: LoadCssService) { }

  ngOnInit(): void {
    this.loadCssService.loadCss('assets/vendors/bootstrap/dist/css/bootstrap.min.css');
    this.loadCssService.loadCss('assets/build/css/custom.min.css');
    this.loadCssService.loadScript('assets/build/js/custom.min.js');
  }
}

