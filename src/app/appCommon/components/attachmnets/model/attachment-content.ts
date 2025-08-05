export interface AttachmentContentPayload {
  imagePath: string;
}

export interface AttachmentContentResponse {
  response: {
    responseCode: string;
    responseDesc: string;
    requestUUID: string;
    traceError: string;
    data: {
      imagesAsBase64List: string[];
    }
  };
}
