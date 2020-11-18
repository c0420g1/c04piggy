import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PigDTO} from '../model/PigDTO';
import {Pig} from '../model/Pig';
import {Herd} from '../model/Herd';

@Injectable({
  providedIn: 'root'
})
export class PigService {
  private readonly API_URL_PIG_LIST_SHOW = 'http://localhost:8080/pigList';
  private readonly API_URL_PIG_LIST = 'http://localhost:8080/pigListFull';
  private readonly API_URL_GET_PIG = 'http://localhost:8080/pigDetail';
  private readonly API_URL_ADD_PIG = 'http://localhost:8080/addPig';
  private readonly API_URL_EDIT_PIG = 'http://localhost:8080/editPig';
  private readonly API_URL_DELETE_PIG = 'http://localhost:8080/deletePig';
  private readonly API_URL_SOLD_PIG = 'http://localhost:8080/soldPig';
  private readonly API_URL_HERD_LIST = 'http://localhost:8080/herdListAll';

  constructor(private http: HttpClient) {
  }

  // pig
  search(pageNum: number, search: string): Observable<PigDTO[]> {
    return this.http.get<PigDTO[]>(this.API_URL_PIG_LIST_SHOW + '/' + pageNum + '?search=' + search);
  }

  getPig(id: number): Observable<Pig> {
    return this.http.get<Pig>(this.API_URL_GET_PIG + '/?id=' + id);
  }

  getAll(): Observable<Pig[]> {
    return this.http.get<Pig[]>(this.API_URL_PIG_LIST);
  }

  addPig(pig: Partial<Pig>): Observable<Pig> {
    return this.http.post<Pig>(this.API_URL_ADD_PIG, pig);
  }

  editPig(pig: Pig) {
    console.log(pig.id);
    return this.http.patch<Pig>(this.API_URL_EDIT_PIG, pig);
  }

  delete(ids: number[]): Observable<number> {
    return this.http.patch<number>(this.API_URL_DELETE_PIG, ids);
  }

  // herd
  getListHerd(): Observable<Herd[]> {
    return this.http.get<Herd[]>(this.API_URL_HERD_LIST);
  }

  // sold pig
  soldPig(pigId: number) {
    return this.http.patch<Pig>(this.API_URL_SOLD_PIG, pigId);
  }
}


