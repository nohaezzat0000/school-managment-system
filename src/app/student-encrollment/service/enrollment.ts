import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService  {

  private apiUrl = 'http://localhost:8080/applicants';

  constructor(private http: HttpClient) {
  }

  getAllEnrollmentRequests(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl + '/enrollments');
  }

  getEnrollmentRequestById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Accept applicant
  acceptEnrollmentRequest(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/accept`, null);
  }

  // Reject applicant
  rejectEnrollmentRequest(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/reject`, null);
  }
}
