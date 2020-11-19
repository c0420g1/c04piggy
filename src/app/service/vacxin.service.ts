import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cote } from '../model/Cote';
import { Global } from '../model/Global';
import { Pig } from '../model/Pig';
import { TreatmentDTO } from '../model/TreatmentDTO';

@Injectable({
  providedIn: 'root'
})
export class VacxinService {
  private readonly TREATMENTDTO_URL = Global.host + 'vaccineInfoDTO';
  private readonly COTE_URL = Global.host + 'cote';
  private readonly DELETE_URL = Global.host + 'treatmentVacxin';
  private readonly GETPIG_URL = Global.host + 'pig';
  constructor(private http: HttpClient) { }

  getData(pageNum: number, search: string):Observable<TreatmentDTO[]>{
    return  this.http.get<TreatmentDTO[]>(this.TREATMENTDTO_URL + '/' + pageNum + '?search=' + search + '&type=vacxin')
  }

  getAllCote(): Observable<Cote[]>{
    return this.http.get<Cote[]>(this.COTE_URL);
  }
  // getById(id): Observable<any>{}
  delete(ids: number[]): Observable<number>{
    return this.http.put<number>(this.DELETE_URL, ids);
  }
   getPigByCoteId(coteId):Observable<Pig[]>{
    return this.http.get<Pig[]>(this.GETPIG_URL + '/' + coteId);
  }
}
