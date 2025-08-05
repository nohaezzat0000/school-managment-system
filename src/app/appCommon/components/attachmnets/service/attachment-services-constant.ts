export class AttachmentServicesConstant {
  /*Lookup Request Services*/
  private static ATTACHMENT_REQ = "attachment";

  static ATTACHMENT_REQ_DOWNLOAD = `${this.ATTACHMENT_REQ}/download-attachment`;

  static PRINT_SEASONAL_LICENSE = `company/spc/seasonal-lic/request/print`
  static PACKAGE_ATTACHMENT =`package/attachment/download-attachment?idAlt={attachmentId}`

  static ATTACHMENT_REQ_PREVIEW = `${this.ATTACHMENT_REQ}/preview-attachment`;

  static PARSE_SOURCE_TO_BASE64 = `${this.ATTACHMENT_REQ}/get-attachments-content`;
  static PARSE_SINGLE_SOURCE_TO_BASE64 = `${this.ATTACHMENT_REQ}/get-attachment-content`;
  static GET_ATTACHMENT_CONTENT_BY_ID = `${this.ATTACHMENT_REQ}/get-attachment-content-by-id`;
}
