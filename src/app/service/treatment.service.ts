import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TreatmentDTO} from '../model/TreatmentDTO';
import {Global} from '../model/Global';
import {TreatmentVacxins} from '../model/TreatmentVacxins';
import {Cote} from '../model/Cote';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private readonly TREATMENTDTO_URL = Global.host + 'treatmentVacxinDTO';
  private readonly COTE_URL = Global.host + 'cote';

  constructor(private http: HttpClient) {}

  getData(pageNum: number, search: string):Observable<TreatmentDTO[]>{

    return  this.http.get<TreatmentDTO[]>(this.TREATMENTDTO_URL + '/' + pageNum + '?search=' + search + '&type=treatment')
  }
  getCote(): Observable<Cote[]>{
    return this.http.get<Cote[]>(this.COTE_URL);
  }
  // getById(id): Observable<any>{}
}
