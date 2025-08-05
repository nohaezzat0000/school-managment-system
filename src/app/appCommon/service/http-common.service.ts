import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {MessageService} from 'primeng/api';



@Injectable({
  providedIn: 'root'
})
export class HttpCommonService {

  constructor(private http: HttpClient, private messageService: MessageService) {
  }

  public postObservable<T>(url: string, requestBody: any, headers?: any, responseType?: 'json', options?: any): Observable<T> {
    return this.http.post<any>(url, requestBody, {headers, responseType, ...options}).pipe(
      map((data: any) => {
        // if (data.response.responseCode != "0") {
        //   this.showErrorMessageList(data.response);
        //   logger1.error(this.prepareErrorInfo(data.response, url))
        // }
        //TODO return specification
        return data;
      }),
    );
  }

  public getObservable<T>(url: string, headers?: any): Observable<T> {
    const headersInfo = headers ? {headers} : {}
    return this.http.get<any>(url, headersInfo).pipe(
      map((data: any) => {
        // if (data.response.responseCode != "0") {
        //   logger1.error(this.prepareErrorInfo(data.response, url))
        //   this.showErrorMessageList(data.response)
        // }
        return data;
      })
    );
  }

  private prepareErrorInfo(response: any, url: string): {} {
    try {
      return {
        'FailurePoint': "HttpCommonService",
        'ResponseCode': response.responseCode,
        'Service-URL': url,
        'Request-UUID': response.requestUUID,
        'Description': response.responseDesc
      }
    } catch (e) {
      return {
        'FailurePoint': "HttpCommonService",
        'Service-URL': url,
      }
    }

  }

}
