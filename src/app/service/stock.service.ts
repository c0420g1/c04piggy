import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StockDTO} from '../model/StockDTO';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private readonly GET_ALL_STOCK_DTO_API = 'http://localhost:8080/stockDTO/1';

  constructor(private http: HttpClient) { }

  getAll(): Observable<StockDTO[]>{
    return this.http.get<StockDTO[]>(this.GET_ALL_STOCK_DTO_API);
  }
}
