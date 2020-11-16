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
  private readonly APIgetStock = Global.host + 'getStock/';
  private readonly APIdeleteStock = Global.host + 'deleteStock';
  private readonly GET_ALL_FEED_TYPE_API =Global.host +'feedType';
  private readonly GET_ALL_VENDOR_API =Global.host + 'vendor';
  private readonly ADD_EDIT_DELETE_STOCK_API = Global.host +'';

  constructor(private http: HttpClient) { }

  getData(pageNum: number, search: string): Observable<StockDTO[]>{
    return this.http.get<StockDTO[]>(this.APIgetStock + pageNum + '?pageSize=' + Global.pageSize + '&search=' + search);
  }

  delete(ids: number[]): Observable<number>{
    return this.http.put<number>(this.APIdeleteStock, ids);
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

}
