import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AttachmentsDto } from '../model/AttachmentsDto';
import { AttachmentService } from '../service/attachment.service';
import { AttachmentTypesEnum } from '../model/attachment-types.enum';
import {EncryptDecryptUtility} from '../../../service/encryptDecryptUtility';


@Component({
  selector: 'g-attachment-upload',
  templateUrl: './attachment-upload.component.html',
  styleUrls: ['./attachment-upload.component.scss'],
  standalone: true,
  imports: [TranslateModule, NgIf, ReactiveFormsModule, NgClass],
})
export class AttachmentUploadComponent implements OnInit {
  protected readonly Validators = Validators;
  @Input() inputFormControl: any;
  @Input() acceptedFileTypes: AttachmentTypesEnum[] = [
    AttachmentTypesEnum.PDF,
    AttachmentTypesEnum.PNG_IMAGE,
    AttachmentTypesEnum.JPEG_IMAGE,
  ];
  @Input() label: string='';
  @Input() fontWeight: string | number = '500';
  @Input() maxFileSize: number = 500000;
  @Input() attachmentObject: any;
  @Input() clientSideDownload: boolean = false;
  @Input() downloadUrl: string='';
  @Input() clientSidePreview: boolean = false;
  @Input() previewUrl: string='';
  @Input() showPreviewFile: boolean = false;
  @Input() disableUpload: boolean = false;
  @Input() disableDownload: boolean = false;
  @Input() downloadableFileName: boolean = false; // flag to show file name only with download action
  @Input() hint: string='';
  @Input() useOriginalDownloadURL: boolean = true;
  @Input() translatedHint?: string;
  @Input() isCustomAttach?: boolean = false;
  @Input() isFullCustomUrl?: boolean = true; // related to "isCustomAttach" ONLY, default accept full URL
  @Input() customDownloadMethod?: string = 'GET'; // ONLY when useOriginalDownloadURL is false and using custom downloadUrl


  invalidFileSize: boolean = false;
  invalidFileType: boolean = false;
  allowedFileTypes: string='';
  technicalAllowedFileTypes: string='';

  constructor(
    private _attachmentService: AttachmentService,
  ) {
    if (this.acceptedFileTypes) {
      this.allowedFileTypes = this.acceptedFileTypes.join(', ');
      this.allowedFileTypes = this.allowedFileTypes
        .replace('image/png', '.png')
        .replace('image/jpeg', '.jpeg')
        .replace(AttachmentTypesEnum.PDF, '.pdf')
        .replace(AttachmentTypesEnum.TXT, '.txt')
        .replace(AttachmentTypesEnum.DOCX, '.docs')
        .replace(AttachmentTypesEnum.EXCEL, '.xlsx')
        .replace(AttachmentTypesEnum.XLS, '.xls')
        .replace(AttachmentTypesEnum.RICH_TEXT, '.rtf');
    }
  }

  ngOnInit(): void {
    if (!this.inputFormControl && !this.disableUpload) {
      throw new Error(
        'Yo must provide inputFormControl as input => Example :' +
          '[inputFormControl]="yourFormGroup.get(yourFormControllerName)"'
      );
    }
    if (this.acceptedFileTypes) {
      this.allowedFileTypes = this.acceptedFileTypes.join(', ');
      this.allowedFileTypes = this.allowedFileTypes
        .replace('image/png', '.png')
        .replace('image/jpeg', '.jpeg')
        .replace(AttachmentTypesEnum.PDF, '.pdf')
        .replace(AttachmentTypesEnum.TXT, '.txt')
        .replace(AttachmentTypesEnum.DOCX, '.docs')
        .replace(AttachmentTypesEnum.EXCEL, '.xlsx')
        .replace(AttachmentTypesEnum.XLS, '.xls')
        .replace(AttachmentTypesEnum.RICH_TEXT, '.rtf');
    }
  }

  onAttachmentUpload(file: any) {
    if (
      file &&
      file.target &&
      file.target.files &&
      file.target.files.length > 0
    ) {
      this.invalidFileType = !this.acceptedFileTypes.includes(
        file.target.files[0].type
      );
      if (this.invalidFileType) {
        this.inputFormControl.setValue(null);
        this.inputFormControl.updateValueAndValidity();
        return;
      }
      this.invalidFileSize = file.target.files[0].size > this.maxFileSize;
      if (this.invalidFileSize) {
        this.inputFormControl.setValue(null);
        this.inputFormControl.updateValueAndValidity();
        return;
      }
      this.inputFormControl.setValue(file.target.files[0]);
    }
  }

  getFileExtension(fileName: string): string {
    return fileName.split('.').pop() || '';
  }

  downloadAttachment(attachmentObject: AttachmentsDto, event: Event) {
    if (this.useOriginalDownloadURL) {
      event.stopPropagation();
      if (
        !this.disableDownload &&
        ((this.inputFormControl &&
          this.inputFormControl.value &&
          this.inputFormControl.value.fileName &&
          this.inputFormControl.value.id) ||
          (this.attachmentObject &&
            this.attachmentObject.id &&
            this.attachmentObject.fileName))
      ) {
        if (!this.clientSideDownload && !this.downloadUrl) {
          this._attachmentService.downloadAttach(attachmentObject).subscribe({
            next: (res: any) => {
              if (res!.response!.responseCode == '0') {
                const url = URL.createObjectURL(
                  new Blob([this.base64ToArrayBuffer(res.response.data)], {
                  type: attachmentObject.fileMIME,
                  })
                );
                const link = document.createElement('a');
                link.href = url;
                link.download = attachmentObject.fileName + '';

                link.click();
                URL.revokeObjectURL(url);
              } else {
                // this._gMessagesService.showError(
                //   '',
                //   res!.response!.data.responseDesc,
                //   false
                // );
              }
            },
            error: (err) => {
              // this._gMessagesService.showError('', err, false);
            },
          });
        } else if (!this.clientSideDownload && this.downloadUrl) {
          this._attachmentService
            .downloadAttachment(this.downloadUrl, attachmentObject)
            .subscribe({
              next: (res: any) => {
                if (res!.response!.responseCode == '0') {
                  const url = URL.createObjectURL(
                    new Blob([this.base64ToArrayBuffer(res.response.data)], {
                    type: attachmentObject.fileMIME,
                    })
                  );
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = attachmentObject.fileName + '';

                  link.click();
                  URL.revokeObjectURL(url);
                } else {
                  // this._gMessagesService.showError(
                  //   '',
                  //   res!.response!.data.responseDesc,
                  //   false
                  // );
                }
              },
              error: (err) => {
               // this._gMessagesService.showError('', err, false);
              },
            });
        }
      }
    } else {
      // downloadPackageAttach
      debugger;
      if (!this.clientSideDownload && !this.downloadUrl && this.attachmentObject.id) {
        let encryptedAttachmentID = EncryptDecryptUtility.encrypt(this.attachmentObject.id?.toString());
        this._attachmentService.downloadPackageAttach(encryptedAttachmentID).subscribe({
          next: (res: any) => {
            if (res!.response!.responseCode == '0') {
              const url = URL.createObjectURL(
                new Blob([this.base64ToArrayBuffer(res.response.data)], {
                  type: attachmentObject.fileMIME,
                })
              );
              const link = document.createElement('a');
              link.href = url;
              link.download = attachmentObject.fileName + '';

              link.click();
              URL.revokeObjectURL(url);
            } else {
              // this._gMessagesService.showError(
              //   '',
              //   res!.response!.data.responseDesc,
              //   false
              // );
            }
          },
          error: (err) => {
           // this._gMessagesService.showError('', err, false);
          },
        });
      }
      else if (this.downloadUrl) {
        this.handleCustomDownload(attachmentObject);
      }
    }
  }

  deleteUploadedFile(formControl: FormControl) {
    if (formControl) {
      formControl.reset(); // Resets the value of the FormControl to null and the status to 'Pristine'
    }
  }

  private base64ToArrayBuffer(x: string) {
    var binaryString = window.atob(x);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  previewAttachment(attachmentObject: any, event: Event) {
    event.stopPropagation();

    if (
      this.showPreviewFile &&
      ((this.inputFormControl &&
        this.inputFormControl.value &&
        this.inputFormControl.value.fileName &&
        this.inputFormControl.value.id) ||
        (this.attachmentObject &&
          this.attachmentObject.id &&
          this.attachmentObject.fileName))
    ) {
      if (!this.clientSidePreview && !this.previewUrl) {
        this._attachmentService.previewAttach(attachmentObject).subscribe({
          next: (res: any) => {
            if (res!.response!.responseCode == '0') {
              const url = this.createBlobUrl(
                res.response.data,
                attachmentObject.fileMime
              );
              window.open(url, '_blank');
              // da elli e4t8l ==================
              // const blob = this.base64ToBlob(res.response.data, attachmentObject.fileMime);
              // const url = URL.createObjectURL(blob);
              // window.open(url, '_blank');
              //
              // const url = URL.createObjectURL(res.response.data);
              // window.open(url, '_blank');
              // const blob = this.base64ToBlob(res.response.data);
              // this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
              //window.open(fileUrl, '_blank');
              // const url = URL.createObjectURL(
              //   new Blob([res.response.data], {
              //     type: attachmentObject.fileMIME,
              //   })
              // );
              // window.open(url, '_blank');
              // URL.revokeObjectURL(url); // Clean up the object URL after usage
              // const link = document.createElement('a');
              // link.href = url;
              // link.download = attachmentObject.fileName + '';
              //
              // link.click();
              // URL.revokeObjectURL(url);
            } else {
              // this._gMessagesService.showError(
              //   '',
              //   res!.response!.data.responseDesc,
              //   false
              // );
            }
          },
          error: (err) => {
           // this._gMessagesService.showError('', err, false);
          },
        });
      } else if (!this.clientSideDownload && this.previewUrl && !this.isCustomAttach) {
        this._attachmentService
          .previewAttachment(this.previewUrl, attachmentObject)
          .subscribe({
            next: (res: any) => {
              if (res!.response!.responseCode == '0') {
                const url = this.createBlobUrl(
                  res.response.data,
                  attachmentObject.fileMime
                );
                window.open(url, '_blank');
                // const url = URL.createObjectURL(
                //   new Blob([this.base64ToArrayBuffer(res.response.data)], {
                //     type: attachmentObject.fileMIME,
                //   })
                // );
                // const link = document.createElement('a');
                // link.href = url;
                // link.download = attachmentObject.fileName + '';
                //
                // link.click();
                // URL.revokeObjectURL(url);
              } else {
                // this._gMessagesService.showError(
                //   '',
                //   res!.response!.data.responseDesc,
                //   false
                // );
              }
            },
            error: (err) => {
             // this._gMessagesService.showError('', err, false);
            },
          });
      } else if (!this.clientSideDownload && this.previewUrl && this.isCustomAttach) {
        this._attachmentService
          .getAttachmentUrl(this.previewUrl, attachmentObject.id, this.isFullCustomUrl)
          .subscribe({
            next: (res: any) => {
              if (res) {

                if(res?.response?.data) { window.open(this.createBlobUrl(res?.response?.data, attachmentObject?.fileMime), '_blank'); }  // case returning base64
                else { window.open(URL.createObjectURL(res), '_blank'); }

              } else {
                // this._gMessagesService.showError(
                //   '',
                //   res!.response!.data.responseDesc,
                //   false
                // );
              }
            },
            error: (err: any) => {
            //  this._gMessagesService.showError('', err, false);
            },
          });
      }
    }
  }

  createBlobUrl(base64: string, mimeType: string): string {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: mimeType });
    return URL.createObjectURL(blob);
  }

  handleCustomDownload(attachmentObject: AttachmentsDto) {
    if(this.customDownloadMethod === 'GET') {
          this._attachmentService
          .customDownloadGET(this.downloadUrl + attachmentObject?.id)
          .subscribe({
            next: (res: any) => {
              if (res!.response!.responseCode == '0') {
                const url = URL.createObjectURL(
                  new Blob([this.base64ToArrayBuffer(res.response.data)], {
                    type: attachmentObject.fileMIME,
                  })
                );
                const link = document.createElement('a');
                link.href = url;
                link.download = attachmentObject.fileName + '';

                link.click();
                URL.revokeObjectURL(url);
              } else {
                // this._gMessagesService.showError(
                //   '',
                //   res!.response!.data.responseDesc,
                //   false
                // );
              }
            },
            error: (err) => {
            //  this._gMessagesService.showError('', err, false);
            },
          });
        }
        else if (this.customDownloadMethod === 'POST') {
          this._attachmentService
          .customDownloadPOST(this.downloadUrl + attachmentObject?.id, attachmentObject)
          .subscribe({
            next: (res: any) => {
              if (res!.response!.responseCode == '0') {
                const url = URL.createObjectURL(
                  new Blob([this.base64ToArrayBuffer(res.response.data)], {
                    type: attachmentObject.fileMIME,
                  })
                );
                const link = document.createElement('a');
                link.href = url;
                link.download = attachmentObject.fileName + '';

                link.click();
                URL.revokeObjectURL(url);
              } else {
                // this._gMessagesService.showError(
                //   '',
                //   res!.response!.data.responseDesc,
                //   false
                // );
              }
            },
            error: (err) => {
              //this._gMessagesService.showError('', err, false);
            },
          });
        }
  }

}
