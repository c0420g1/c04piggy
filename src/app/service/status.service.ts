import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PigAssociateStatus} from '../model/PigAssociateStatus';
import {PigStatus} from '../model/PigStatus';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private readonly API_URL_LIST_STATUS = 'http://localhost:8080/pigStatusList';
  private readonly API_URL_LIST_PIG_STATUS = 'http://localhost:8080/pigAssociateStatusListByPigId';
  private readonly API_URL_ADD_PIG_STATUS = 'http://localhost:8080/addPigAssociateStatus';
  private readonly API_URL_EDIT_PIG_STATUS = 'http://localhost:8080/editPigAssociateStatus';
  private readonly API_URL_DELETE_PIG_STATUS = 'http://localhost:8080/deletePigAssociateStatus';

  constructor(private http: HttpClient) { }

  //pigStatus
  getListStatusByPigId(id: number): Observable<PigAssociateStatus[]> {
    return this.http.get<PigAssociateStatus[]>(this.API_URL_LIST_PIG_STATUS + '/' + id);
  };

  getAllStatus(): Observable<PigStatus[]> {
    return this.http.get<PigStatus[]>(this.API_URL_LIST_STATUS);
  };

  addPigStatus(pigStatus: Partial<PigAssociateStatus>): Observable<PigAssociateStatus> {
    return this.http.post<PigAssociateStatus>(this.API_URL_ADD_PIG_STATUS, pigStatus);
  };

  editPigStatus(pigStatus: PigAssociateStatus) {
    return this.http.patch<PigAssociateStatus>(this.API_URL_EDIT_PIG_STATUS, pigStatus);
  };

  deletePig(id: number[]) : Observable<any> {
    return this.http.delete(`${this.API_URL_DELETE_PIG_STATUS}/${id}`);
  }


}
