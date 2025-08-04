import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) {
  }

  getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token') || '';
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  public postObservable<T>(
    url: string,
    requestBody: any,
    headers?: HttpHeaders,
    responseType: 'json' = 'json',
    options?: any
  ): Observable<T> {
    const mergedHeaders = headers || this.getHeaders();
    return this.http.post<any>(url, requestBody, {
      headers: mergedHeaders,
      responseType,
      ...options
    }).pipe(
      map((data: any) => {
        // errors handling
        return data;
      })
    );
  }

  public getObservable<T>(
    url: string,
    headers?: HttpHeaders
  ): Observable<T> {
    const mergedHeaders = headers || this.getHeaders();
    return this.http.get<any>(url, {headers: mergedHeaders}).pipe(
      map((data: any) => {
        // errors handling
        return data;
      })
    );
  }
}
