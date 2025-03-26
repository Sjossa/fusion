export interface FileData {
    id: string;
    [key: string]: string | number | null;
}

export interface FileRow {
    id?: string;
    [key: string]: any;
}

export interface ColumnMapping {
    id: string;
    name: string;
    displayName: string;
    required?: boolean;
}

export type UploadedData = FileRow[];