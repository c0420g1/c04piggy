import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TreatmentDTO} from '../model/TreatmentDTO';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private TREATMENTDTO_URL = 'http://localhost:8080/treatmentVacxinDTO';
  private TREATMENTBYID_URL = 'http://localhost:8080/treatmentVacxin';
  constructor(private http: HttpClient) {}
  getAll(pageNum,search,type):Observable<TreatmentDTO[]>{
    return this.http.get<TreatmentDTO[]>(this.TREATMENTDTO_URL+ '/' + pageNum + '?seacrh=' + search + '&type=' + type)
  }
  // getById(id): Observable<any>{}
}
