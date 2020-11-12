import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TreatmentDTO} from '../model/TreatmentDTO';
import {Global} from '../model/Global';
import {TreatmentVacxins} from '../model/TreatmentVacxins';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private TREATMENTDTO_URL = Global.host + 'treatmentVacxinDTO';
  private TREATMENT_URL = Global.host +'treatmentVacxin';
  constructor(private http: HttpClient) {}
  getAll():Observable<TreatmentVacxins[]>{
    return this.http.get<TreatmentVacxins[]>(this.TREATMENT_URL)
  }
  search(pageNum: number, search: string):Observable<TreatmentDTO[]>{
    return  this.http.get<TreatmentDTO[]>(this.TREATMENTDTO_URL + '/' + pageNum + '?seacrh=' + search + '&type=treatment')
  }
  // getById(id): Observable<any>{}
}
