import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HistoryExport} from '../model/HistoryExport';

// @ts-ignore
@Injectable({
  providedIn: 'root'
})
export class HistoryExportService {
  private readonly API_URL = 'localhost:8080/export-management';

  constructor(private http: HttpClient) { }

  getAll(): Observable<HistoryExport[]>{
    return this.http.get<HistoryExport[]>(this.API_URL);
  }

}
