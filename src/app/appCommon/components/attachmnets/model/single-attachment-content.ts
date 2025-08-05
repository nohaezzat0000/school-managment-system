export interface SingleAttachmentContentResponse {
  imagePath: string;
}

export interface SingleAttachmentContentResponse {
  response: {
    responseCode: string;
    responseDesc: string;
    requestUUID: string;
    traceError: string;
    data: {
      imagesAsBase64: string;
    }
  };
}
