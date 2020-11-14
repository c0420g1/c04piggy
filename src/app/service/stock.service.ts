import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockDTO} from '../model/StockDTO';
import {Stock} from '../model/Stock';
import {FeedType} from '../model/FeedType';
import { Vendor } from '../model/Vendor';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly GET_ALL_STOCK_API = 'http://localhost:8080/listStock';
  private readonly GET_ALL_STOCK_DTO_API = 'http://localhost:8080/stockDTO';
  private readonly GET_ALL_FEED_TYPE_API = 'http://localhost:8080/feedType';
  private readonly GET_ALL_VENDOR_API = 'http://localhost:8080/vendor';
  private readonly ADD_EDIT_DELETE_STOCK_API = 'http://localhost:8080/stock';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Stock[]>{
    return this.http.get<Stock[]>(this.GET_ALL_STOCK_API);
  }
  search(pageNum, search): Observable<StockDTO[]>{
    return this.http.get<StockDTO[]>(this.GET_ALL_STOCK_DTO_API + "/" + pageNum + "?search=" + search);
  }

  getAllFeedType(): Observable<FeedType[]> {
    return this.http.get<FeedType[]>(this.GET_ALL_FEED_TYPE_API);
  }

  getAllVendor(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.GET_ALL_VENDOR_API);
  }

  addStock(stock: Stock): Observable<void>{
    return this.http.post<void>(this.ADD_EDIT_DELETE_STOCK_API, stock);
  }

  editStock(stock: Stock): Observable<void>{
    return this.http.put<void>(this.ADD_EDIT_DELETE_STOCK_API, stock);
  }


  deleteStock(ids: number[]): Observable<number>{
    return this.http.post<number>(this.ADD_EDIT_DELETE_STOCK_API, ids);
  }

}
