export interface FileUploadRequest {
    name: string;
    displayIndex?: string;
    previewUrl?: string;
    id?: string;
}

export interface UploadResponse {
    createdDate?: string;
    id: string;
    keywords?: string[];
    mimeType?: string;
    name: string;
    orgName: string;
    updatedDate?: string;
    url: string;
    mediaType?: string;
    cover?: boolean;
    viewType?: string;
    imageObjects?: string[];
    imageLogos?: string[];
}

export interface MediaResponse {
    id?: string;
}

export enum MediaTypes {
    IMAGE = 'image',
    VIDEO = 'video',
    DOCUMENT = 'document'
}

export enum MediaActions {
    ADD = 'add',
    UPDATE = 'update',
    DELETE = 'delete',
    REMOVE = 'remove'
}