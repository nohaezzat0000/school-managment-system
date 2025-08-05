import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DialogService} from "primeng/dynamicdialog";
import {DialogModule} from "primeng/dialog";
import {ButtonModule} from "primeng/button";
import {NgIf} from "@angular/common";
import {AttachmentPreviewObject} from "../model/attachment-preview-object";
import {PdfViewerModule} from 'ng2-pdf-viewer';

@Component({
  selector: 'app-attachment-preview',
  templateUrl: './attachment-preview.component.html',
  styleUrls: ['./attachment-preview.component.scss'],
  standalone: true,
  imports: [DialogModule, ButtonModule, NgIf, PdfViewerModule],
  providers:[ DialogService]
})
export class AttachmentPreviewComponent implements OnInit{

  @Input() attachment: any;

  @Output() showAttachment = new EventEmitter();

  attachmentUrl: string ='';
  showDialog: boolean = false;
  isImage: boolean = false;
  pdfSrc: string ='';
  isPdf: boolean = true;
  isTxt: boolean = false;
  textContent: string ='';
  constructor() {}


  closeModal(): void {
    this.showDialog = false;
    this.showAttachment.emit(false);
  }

  ngOnInit() {

    if (this.attachment) {
      this.previewAttachment();
    }
  }

  previewAttachment() {
    if (this.attachment?.attachmentType.includes("image")) {
      this.attachmentUrl = 'data:image/png;base64,' + this.attachment.attachmentContent;
      this.isImage = true;
      this.isPdf = false;
      this.isTxt = false;
    }
    else if(this.attachment.attachmentType.includes("pdf")) {

      this.pdfSrc = 'data:application/pdf;base64,' + this.attachment.attachmentContent;
      this.isPdf = true;
      this.isTxt = false;
      this.isImage = false;

    }
    else {
      this.textContent = this.attachment.attachmentContent ? atob(this.attachment.attachmentContent) : '';
      this.isTxt = true;
      this.isImage = false;
      this.isPdf = false;
    }
    this.showDialog = true;
  }

}
