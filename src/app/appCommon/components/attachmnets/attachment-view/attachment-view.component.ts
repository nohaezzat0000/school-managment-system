import {Component, Input, OnInit} from '@angular/core';
import {AttachmentViewObject} from "../model/attachment-view-object";
import {TranslateModule} from "@ngx-translate/core";
import {NgIf} from "@angular/common";
import {AttachmentPreviewComponent} from "../attachment-preview/attachment-preview.component";
import {HttpCommonService} from '../../../service/http-common.service';

@Component({
  selector: 'app-attachment-view',
  templateUrl: './attachment-view.component.html',
  styleUrls: ['./attachment-view.component.scss'],
  standalone: true,
  imports: [TranslateModule, NgIf, AttachmentPreviewComponent]
})
export class AttachmentViewComponent implements OnInit{
  @Input() attachmentObject: any;
  showAttachment: boolean = false;
  constructor(private commonService: HttpCommonService) {
  }
  ngOnInit(): void {
  }

  downloadAttachment(attachment: AttachmentViewObject){
    if (attachment) {
      if (attachment.attachmentContent) {
        this.handleDownload(attachment);
      }

    }
  }

  previewAttachment(attachment: AttachmentViewObject){
    if (attachment.attachmentContent) {
      this.handlePreview(attachment);
    }
  }

  handleDownload(attachment: any) {
    const byteCharacters = atob(attachment?.attachmentContent);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], {type: attachment.attachmentType});
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = attachment.attachmentName!;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  handlePreview(attachment: AttachmentViewObject) {
    this.attachmentObject.attachmentContent = attachment.attachmentContent;
    this.attachmentObject.attachmentType = attachment.attachmentType;
    this.showAttachment = true;
  }
}
