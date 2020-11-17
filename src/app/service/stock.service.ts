import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockDTO} from '../model/StockDTO';
import {Stock} from '../model/Stock';
import {FeedType} from '../model/FeedType';
import { Vendor } from '../model/Vendor';
import { Global } from '../model/Global';
import {HistoryExportStockAndCote} from '../model/HistoryExportStockAndCote';

// Creator Tuong
@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly GET_ALL_STOCK_DTO_API = Global.host + 'getStock/';
  private readonly DELETE_STOCK_API = Global.host + 'deleteStock';
  private readonly GET_ALL_FEED_TYPE_API =Global.host +'feedType';
  private readonly GET_ALL_VENDOR_API =Global.host + 'vendor';
  private readonly ADD_EDIT_STOCK_API = Global.host +'addEditStock';
  private readonly GET_STOCK_BY_ID_API = Global.host +'getStockById';
  private readonly ADD_EXPORT_HISTORY_STOCK_API = Global.host +'export-management';
  private readonly EXPORT_OUT_STOCK_API = Global.host +'exportOutStock';

  constructor(private http: HttpClient) { }

// tra ve 1 list Stock DTO
  getData(pageNum: number, search: string): Observable<StockDTO[]>{
    return this.http.get<StockDTO[]>(this.GET_ALL_STOCK_DTO_API + pageNum + '?pageSize=' + Global.pageSize + '&search=' + search);
  }

// xoa 1 record trong kho (truyen vao mang co 1 id) (o day la ham chung, xoa 1 list records)
  delete(ids: number[]): Observable<number>{
    return this.http.put<number>(this.DELETE_STOCK_API, ids);
  }

// tra ve 1 list loai thuc an
  getAllFeedType(): Observable<FeedType[]> {
    return this.http.get<FeedType[]>(this.GET_ALL_FEED_TYPE_API);
  }

// tra ve 1 list nha cung cap
  getAllVendor(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(this.GET_ALL_VENDOR_API);
  }

// them hoac sua 1 record trong stock
  addEditStock(stock: Stock): Observable<void>{
    return this.http.post<void>(this.ADD_EDIT_STOCK_API, stock);
  }

// lay ve 1 stock theo id
  getStockById(id: number): Observable<Stock>{
    return this.http.get<Stock>(this.GET_STOCK_BY_ID_API +'/' +id);
  }

// them vao 1 record trong bang lich su xuat kho
  addHistoryExportStock(historyExportStockAndCote: HistoryExportStockAndCote): Observable<void>{
    return this.http.post<void>(this.ADD_EXPORT_HISTORY_STOCK_API, historyExportStockAndCote);
  }

// khau tru 1 so luong theo 1 lo hang trong kho (xuat kho)
  exportOutStock(id: number, quantity: number): Observable<number>{
    return this.http.put<number >(this.EXPORT_OUT_STOCK_API + "/" + id+ "?quantity=" + quantity,null);
  }
}
