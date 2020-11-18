import { Injectable } from '@angular/core';
import {Global} from '../model/Global';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Herd} from '../model/Herd';

@Injectable({
  providedIn: 'root'
})
export class HerdService {
  private readonly HERD_LIST_URL = Global.host + 'herdList';
  private readonly ADD_HERD_URL = Global.host + 'addHerd';
  private readonly GET_EDIT_HERD_URL = Global.host + 'herdDetail';
  private readonly DELETE_HERD_URL = Global.host + 'deleteHerd';
  private readonly ALL_HERD_LIST_URL = Global.host + 'herdListAll';

  constructor(private http: HttpClient) { }

  getData(pageNum: number): Observable<Herd[]>{
    return  this.http.get<Herd[]>(this.HERD_LIST_URL + '/' + pageNum);
  }

  getAll(): Observable<Herd[]> {
    return this.http.get<Herd[]>(this.ALL_HERD_LIST_URL);
  }

  addHerd(herd: Partial<Herd>): Observable<Herd> {
    return this.http.post<Herd>(this.ADD_HERD_URL, herd);
  }

  delete(ids: number[]): Observable<number>{
    return this.http.put<number>(this.DELETE_HERD_URL, ids);
  }

  getHerdDetail(herdId): Observable<Herd>{
    return this.http.get<Herd>(this.GET_EDIT_HERD_URL + '/' + herdId);
  }
}
