import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoteService {
  private readonly API_URL_COTE = 'http://localhost:8080/cote';

  constructor() { }
}
