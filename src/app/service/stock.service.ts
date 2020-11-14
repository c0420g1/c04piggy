import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockDTO} from '../model/StockDTO';
import {Stock} from '../model/Stock';
import {FeedType} from '../model/FeedType';
import { Vendor } from '../model/Vendor';
import { Global } from '../model/Global';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly GET_STOCK_API = Global.host + 'getStock/';
  private readonly DELET_STOCK_API = Global.host + 'deleteStock';
  private readonly GET_ALL_FEED_TYPE_API =Global.host +'feedType';
  private readonly GET_ALL_VENDOR_API =Global.host + 'vendor';
  private readonly ADD_EDIT__STOCK_API = Global.host +'stock';

  constructor(private http: HttpClient) { }

  getData(pageNum: number, search: string): Observable<StockDTO[]>{
    return this.http.get<StockDTO[]>(this.GET_STOCK_API + pageNum + '?pageSize=' + Global.pageSize + '&search=' + search);
  }

  delete(ids: number[]): Observable<number>{
    return this.http.put<number>(this.DELET_STOCK_API, ids);
  }

  getAllFeedType(): Observable<FeedType[]> {
    return this.http.get<FeedType[]>(this.GET_ALL_FEED_TYPE_API);
  }

  getAllVendor(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.GET_ALL_VENDOR_API);
  }

  addStock(stock: Stock): Observable<void>{
    return this.http.post<void>(this.ADD_EDIT__STOCK_API, stock);
  }

  editStock(stock: Stock): Observable<void>{
    return this.http.put<void>(this.ADD_EDIT__STOCK_API, stock);
  }

}
