import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {HistoryExportStockDTO} from '../model/HistoryExportStockDTO';
import {Global} from '../model/Global';

@Injectable({
  providedIn: 'root'
})
export class HistoryStockOutService {
  private readonly API_GET_ALL_HISTORY_STOCK_OUT = 'http://localhost:8080/getAllHistoryStockDTO/';
  constructor(private http: HttpClient) { }
  // Tuong
  // lay ve 1 list History of Stock out, co phan trang va tim kiem
  getData(pageNum: number, search: string): Observable<HistoryExportStockDTO[]> {
    return this.http.get<HistoryExportStockDTO[]>(this.API_GET_ALL_HISTORY_STOCK_OUT +  pageNum + '?pageSize=' + Global.pageSize + '&search=' + search);
  }
}
