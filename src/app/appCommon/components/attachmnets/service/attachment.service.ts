import {Injectable} from "@angular/core";
import {AttachmentsDto} from "../model/AttachmentsDto";
import {AttachmentServicesConstant} from "./attachment-services-constant";
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {AttachmentContentPayload, AttachmentContentResponse} from '../model/attachment-content';
import {UtilService} from '../../../service/utilService';
import {HttpCommonService} from '../../../service/http-common.service';
import {EncryptDecryptUtility} from '../../../service/encryptDecryptUtility';

@Injectable({
  providedIn: "root"
})
export class AttachmentService {
  constructor(
    private _httpCommonService: HttpCommonService,
    private utilService : UtilService,
    private http: HttpClient
  ) {}

  downloadAttachment(url: string, attachmentObject: AttachmentsDto) {
    let idAlt = EncryptDecryptUtility.encryptURI (<string>(attachmentObject.id?.toString()));
    return this._httpCommonService.postObservable(url + "?idAlt=" +idAlt, attachmentObject);
  }

  downloadAttach(attachmentObject: AttachmentsDto) {
    let idAlt = EncryptDecryptUtility.encryptURI (<string>(attachmentObject.id?.toString()));
    return this._httpCommonService.postObservable(AttachmentServicesConstant.ATTACHMENT_REQ_DOWNLOAD + "?idAlt=" +idAlt, attachmentObject,{responseType: 'blob' });
  }


  downloadPackageAttach(encryptedAttachmentID:string){
    const URL = AttachmentServicesConstant.PACKAGE_ATTACHMENT.replace('{attachmentId}',encryptedAttachmentID)
    return this._httpCommonService.getObservable(URL,{responseType: 'blob' });
  }
  previewAttach(attachmentObject: AttachmentsDto) {
    let idAlt = EncryptDecryptUtility.encryptURI(<string>(attachmentObject.id?.toString()));
    return this._httpCommonService.postObservable(AttachmentServicesConstant.ATTACHMENT_REQ_PREVIEW + "?idAlt=" +idAlt, attachmentObject,{responseType: 'blob' });
  }

  previewAttachment(url: string,attachmentObject: AttachmentsDto) {
    let idAlt = EncryptDecryptUtility.encryptURI (<string>(attachmentObject.id?.toString()));
    return this._httpCommonService.postObservable(url + "?idAlt=" +idAlt, attachmentObject,{responseType: 'blob' });
  }

  // get base64 File by path
  public getAttBase64Files(filePaths: AttachmentContentPayload[]): Observable<AttachmentContentResponse> {
     let encryptedFiles =  this.utilService.encryptFilePaths(filePaths);
    return this._httpCommonService.postObservable<AttachmentContentResponse>(AttachmentServicesConstant.PARSE_SOURCE_TO_BASE64, encryptedFiles);
  }

  getRoomAttachmentContent(roomId: number){
     let url =  AttachmentServicesConstant.GET_ATTACHMENT_CONTENT_BY_ID + "?imageId=" + EncryptDecryptUtility.encrypt(roomId.toString());
     return this._httpCommonService.getObservable(url);
  }

  getAttachmentUrl(url: string, attachmentId: string, isFullCustomUrl: boolean = true): Observable<any> {
    if (!isFullCustomUrl) {
      return this._httpCommonService.getObservable(url + attachmentId, { responseType: 'blob' });
    }
    else {
      return this.http.get(`${url}${encodeURIComponent(attachmentId)}`, {
        responseType: 'blob',
      });
    }
  }

  customDownloadGET(url: string) {
    return this._httpCommonService.getObservable(url);
  }

  customDownloadPOST(url: string, attachmentObject: AttachmentsDto) {
    return this._httpCommonService.postObservable(url, attachmentObject);
  }

}
