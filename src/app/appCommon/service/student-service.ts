import { Injectable } from '@angular/core';
import  { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
export interface Student {
  id: number;
  name: string;
  class: string;
  grade: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private api = "https://07cc54e5-b9fb-416f-a543-0232a05f910f.mock.pstmn.io/admin/users/students"


  constructor(private http: HttpClient) {}

  // get all students
  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.api);
  }

}
