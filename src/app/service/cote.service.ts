import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Cote} from '../model/Cote';
import {CoteDTO} from '../model/CoteDTO';

@Injectable({
  providedIn: 'root'
})
export class CoteService {
  private readonly API_URL_COTE = 'http://localhost:8080/cote';
  
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


}
