import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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
  private readonly API_URL_MALE_LIST = 'http://localhost:8080/pigMale';
  private readonly API_URL_FEMALE_LIST = 'http://localhost:8080/pigFemale';
  private readonly API_URL_GET_PIG = 'http://localhost:8080/pigDetail';
  private readonly API_URL_ADD_PIG = 'http://localhost:8080/addPig';
  private readonly API_URL_ADD_NEW_BORN_PIG = 'http://localhost:8080/pigAdd';
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

  maleList(filter: string): Observable<Pig[]> {
    return this.http.get<Pig[]>(this.API_URL_MALE_LIST + '/' + '?filter=' + filter);
  }

  femaleList(filter: string): Observable<Pig[]> {
    return this.http.get<Pig[]>(this.API_URL_FEMALE_LIST + '/' + '?filter=' + filter);
  }

  addPig(pig: Partial<Pig>): Observable<Pig> {
    return this.http.post<Pig>(this.API_URL_ADD_PIG, pig);
  }

  addPigNewBorn(pig: Partial<Pig>): Observable<Pig> {
      return this.http.post<Pig>(this.API_URL_ADD_PIG, pig);
  }


  editPig(pig: Partial<Pig>) {
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


