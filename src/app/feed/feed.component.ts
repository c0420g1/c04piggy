import { Component, OnInit } from '@angular/core';
import {FeedService} from '../service/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  columnHeader = { 'id': 'ID', 'amount': 'Amount' , 'code': 'Code','unit' : 'Unit','feedType.name': 'FeedType','herd.name':'Herd'};
  constructor(public feedService: FeedService) { }

  ngOnInit(): void {
  }

}
