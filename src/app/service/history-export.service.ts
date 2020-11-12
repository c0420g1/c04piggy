import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {HistoryExport} from '../model/HistoryExport';

// @ts-ignore
@Injectable({
    providedIn: 'root'
})
export class HistoryExportService {
    private readonly API_URL = 'http://localhost:8080/export-management/';
    private readonly API_URL_DEL = 'http://localhost:8080/delCoteExport/';

    constructor(private http: HttpClient) {
    }

    getAll(pageNum: number, search): Observable<HistoryExport[]> {
        return this.http.get<HistoryExport[]>(this.API_URL + pageNum + '?search=' + search);
    }

    delete(id): Observable<any> {
        return this.http.delete<any>(this.API_URL_DEL, id);
    }

}
