export interface FileRow {
    [key: string]: string | number | null;
}

export type UploadedData = FileRow[];