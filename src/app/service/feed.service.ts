import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Feed} from '../model/Feed';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private readonly API_URL = 'http://localhost/feeds';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Feed[]>{
    return this.http.get<Feed[]>(this.API_URL);
  }
}
