import * as CryptoJS from 'crypto-js';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptUtility {
  static key: string="";
  private static ivKey: CryptoJS.lib.WordArray | undefined= CryptoJS.enc.Hex.parse('00000000000000000000000000000000');
  constructor() {
  }

  static encrypt(str: string) {
     const encrypted=   CryptoJS.AES.encrypt(str, CryptoJS.enc.Utf8.parse( this.key), {
      iv: this.ivKey,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }) ;
   //  console.log(encrypted.toString());
     return encrypted.toString() ;
  }
  static encryptURI(str: string) {
    const encrypted=   CryptoJS.AES.encrypt(str, CryptoJS.enc.Utf8.parse( this.key), {
      iv: this.ivKey,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }) ;
    //  console.log(encrypted.toString());
    return encodeURIComponent(encrypted.toString()) ;
  }

  static decrypt(str:string) {
    const decrypted=   CryptoJS.AES.decrypt(str, CryptoJS.enc.Utf8.parse( this.key), {
      iv: this.ivKey,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8) ;
  }





/*   -old-
  public static key: String = "0123456789abcdef";

  static encryptBK(str: string) {
    console.log(CryptoJS.AES.encrypt(str, "0123456789abcdef").toString())
    return CryptoJS.AES.encrypt(str, "0123456789abcdef").toString();
  }

  static decryptBK(str:string) {
    return CryptoJS.AES.decrypt(str, "0123456789abcdef").toString(CryptoJS.enc.Utf8);
  }
//,{ padding: CryptoJS.pad.Pkcs7 }
*/


}


