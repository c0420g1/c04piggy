import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TreatmentDTO} from '../model/TreatmentDTO';
import {Global} from '../model/Global';
import {TreatmentVacxins} from '../model/TreatmentVacxins';
import {Cote} from '../model/Cote';
import {Pig} from '../model/Pig';
import {Diseases} from '../model/Diseases';
import {Vaccine} from '../model/Vaccine';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private readonly TREATMENTDTO_URL = Global.host + 'treatmentVacxinDTO';
  private readonly COTE_URL = Global.host + 'cote';
  private readonly DELETE_URL = Global.host + 'treatmentVacxin';
  private readonly GETPIG_URL = Global.host + 'pig';
  private readonly GETDISEASES_URL = Global.host + 'diseases';
  private readonly GETMEDICINE_URL = Global.host + 'medicine';
  private readonly GETTREATMENTBYID_URL = Global.host + 'treatmentVacxin/';
  private readonly ADDEDITTREATMENT_URL = Global.host + 'treatmentVacxin';

  constructor(private http: HttpClient) {}

  getData(pageNum: number, search: string):Observable<TreatmentDTO[]>{
    return  this.http.get<TreatmentDTO[]>(this.TREATMENTDTO_URL + '/' + pageNum + '?search=' + search + '&type=treatment')
  }

  getAllCote(): Observable<Cote[]>{
    return this.http.get<Cote[]>(this.COTE_URL);
  }
  getTreatmentById(id): Observable<TreatmentVacxins>{
    return this.http.get<TreatmentVacxins>(this.GETTREATMENTBYID_URL + id)
  }
  delete(ids: number[]): Observable<number>{
    return this.http.put<number>(this.DELETE_URL, ids);
  }
   getPigByCoteId(coteId):Observable<Pig[]>{
    return this.http.get<Pig[]>(this.GETPIG_URL + '/' + coteId);
  }
  getAllDiseases(): Observable<Diseases[]>{
    return this.http.get<Diseases[]>(this.GETDISEASES_URL);
  }
  getAllMedicne(): Observable<Vaccine[]>{
    return this.http.get<Vaccine[]>(this.GETMEDICINE_URL);
  }
  addEditTreatment(treatmentVacxins): Observable<number>{
    return this.http.post<number>(this.ADDEDITTREATMENT_URL,treatmentVacxins);
  }
}
