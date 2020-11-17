import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HistoryExport} from '../model/HistoryExport';
import {HistoryExportStockDTO} from '../model/HistoryExportStockDTO';
import { Global } from '../model/Global';

// @ts-ignore
@Injectable({
    providedIn: 'root'
})
export class HistoryExportService {
    private readonly API_URL = 'http://localhost:8080/export-management/';
    private readonly API_URL_DEL = 'http://localhost:8080/delCoteExport/';
    private readonly API_GET_ALL_HISTORY_EXPORT_STOCK = 'http://localhost:8080/getAllHistoryStockDTO/';

    constructor(private http: HttpClient) {
    }

    getData(pageNum: number, search): Observable<HistoryExport[]> {
        return this.http.get<HistoryExport[]>(this.API_URL + pageNum + '?search=' + search);
    }

    delete(id: number[]): Observable<any> {
        return this.http.put<any>(this.API_URL_DEL, id);
    }

    //Tuong
    // lay ve 
    // getData(pageNum: number, search: string): Observable<HistoryExportStockDTO[]>{
    //     return this.http.get<HistoryExportStockDTO[]>(this.API_GET_ALL_HISTORY_EXPORT_STOCK + pageNum + '?pageSize=' + Global.pageSize + '&search=' + search);
    // }

}
