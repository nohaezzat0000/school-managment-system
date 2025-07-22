import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private apiUrl = 'https://e6096bf4-3ac3-48b1-b3b9-acfaa89f04a0.mock.pstmn.io/Mangment';

  constructor(private http: HttpClient) {}

  getManagers(): Observable<{ managers: any[] }> {
      return this.http.get<any>(this.apiUrl);

  }

}
