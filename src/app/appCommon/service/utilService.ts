import { Injectable } from "@angular/core";
import {AttachmentContentPayload} from '../components/attachmnets/model/attachment-content';
import {EncryptDecryptUtility} from './encryptDecryptUtility';


@Injectable({
  providedIn: 'root',
})
export class UtilService {
      constructor() {}

public encryptFilePaths(filePaths: AttachmentContentPayload[]){
        debugger
     let encryptedFilePaths: any [] = [];

     if (filePaths) {
      filePaths?.forEach(file => {
        if(file)
          encryptedFilePaths.push({imagePath: EncryptDecryptUtility.encrypt(file.imagePath)})
        else
          encryptedFilePaths.push(null);
      })
    }
    return encryptedFilePaths;
}

    openFileInNewTab(data:any, fileName: string) {
    const url = URL.createObjectURL(new Blob([this.base64ToArrayBuffer(data)], { type: "application/pdf" }));
    const newTab = window.open("", "_blank");
    if (newTab) {
      newTab.document.write(`
              <html>
                <head>
                  <title>${fileName}</title>
                  <style>
                    body {
                      margin: 0;
                      padding: 0;
                      display: flex;
                      flex-direction: column;
                      height: 100vh;
                      overflow: hidden;
                    }
                    .header {
                      text-align: center;
                      padding: 10px;
                      background-color: #f5f5f5;
                      font-size: 18px;
                      font-weight: bold;
                      border-bottom: 1px solid #ccc;
                    }
                    .content {
                      flex-grow: 1;
                    }
                    embed {
                      width: 100%;
                      height: 100%;
                      border: none;
                    }
                  </style>
                </head>
                <body>
                  <div class="header">${fileName}</div>
                  <div class="content">
                    <embed src="${url}" type="application/pdf" />
                  </div>
                </body>
              </html>
            `);

      newTab.document.close();
      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 10000);
    } else {
      alert("Unable to open a new tab. Please allow pop-ups for this website.");
    }
  }
    base64ToArrayBuffer(x: string) {
    var binaryString = window.atob(x);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}
