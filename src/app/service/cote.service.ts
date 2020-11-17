import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {Cote} from '../model/Cote';
import {CoteDTO} from '../model/CoteDTO';
import {Pig} from '../model/Pig';
import { PigDTONew } from '../model/PigDTONew';

@Injectable({
  providedIn: 'root'
})
export class CoteService {
  private readonly API_URL_COTE = 'http://localhost:8080/cote';
  private readonly API_URL_PIG = 'http://localhost:8080/listPig';
  private readonly API_URL_STATUS_PIG = 'http://localhost:8080/listPigStatus';
  private readonly API_URL_DETAIL_COTE = 'http://localhost:8080/idCote';

  constructor(private http: HttpClient) { }

  getAllCote(pageNum: number,search: string): Observable<CoteDTO[]>{
    return this.http.get<CoteDTO[]>(this.API_URL_COTE + '/' + pageNum + '?search=' + search);
  }

  getListCote(search: string): Observable<Cote[]>{
    return this.http.get<Cote[]>(this.API_URL_COTE + '?search=' +search);
  }

  addNewCote(cote: Cote):Observable<void>{
    return this.http.post<void>(this.API_URL_COTE, cote);
  }

  getListPig(herdCode: string): Observable<Pig[]>{
    return this.http.get<Pig[]>(this.API_URL_PIG + '?herdCode=' +herdCode);
  }

  getStatusPig(herdCode: string): Observable<PigDTONew[]>{
    return this.http.get<PigDTONew[]>(this.API_URL_STATUS_PIG + '?herdCode=' +herdCode);
  }

  getCoteInform(id: number): Observable<Cote>{
    return this.http.get<Cote>(this.API_URL_DETAIL_COTE + '/' +id);
  }
}
