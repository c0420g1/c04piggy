import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GlobalUtil} from '../shared/GlobalUtil';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  // private readonly getAllStockDTO_API = GlobalUtil.host + "/stockDTO/{pageNum}";
  constructor(private http: HttpClient) { }
}
