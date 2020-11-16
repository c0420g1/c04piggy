import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Feed} from '../model/Feed';
import {FeedType} from '../model/FeedType';
import {Herd} from '../model/Herd';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  private readonly API_URL = 'http://localhost:8080/feedDTOs';
  private readonly API_URL5 = 'http://localhost:8080/feedsType';
  private readonly API_URL1 = 'http://localhost:8080/deleteFeed';
  private readonly API_URL2 = 'http://localhost:8080/herdList';
  private readonly API_URL3 = 'http://localhost:8080/createFeed';
  private readonly API_URL4 = 'http://localhost:8080/searchFeed';
  private readonly API_URL6 = 'http://localhost:8080/feeds';
  constructor(private http: HttpClient) { }

  getAll(): Observable<Feed[]>{
    return this.http.get<Feed[]>(this.API_URL);
  }
  search(pageNum: number, search: string): Observable<Notification[]>{
    return this.http.get<Notification[]>(this.API_URL4 + pageNum + '?search=' + search);
  }

  addEdit(feed: Feed): Observable<void>{
    return this.http.post<void>(this.API_URL3, feed);
  }

  delete(ids: number[]): Observable<number>{
    return this.http.post<number>(this.API_URL1, ids);
  }

  getAllFeedType(): Observable<FeedType[]>{
    return this.http.get<FeedType[]>(this.API_URL5);
  }
  getAllHerd(): Observable<Herd[]>{
    return this.http.get<Herd[]>(this.API_URL2);
  }

  getFeed():Observable<Feed[]>{
    return this.http.get<Feed[]>(this.API_URL6);
  }
}
