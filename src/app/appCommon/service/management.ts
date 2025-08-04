import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User{
  id: number;
  name: string;
  job: string;
}
@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  private apiUrl = 'https://3bb71c31-ff5a-493d-8ad3-9583d1fe0d5f.mock.pstmn.io/management';

  constructor(private http: HttpClient){
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }
}
