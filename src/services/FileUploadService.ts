import multer from 'multer';
import path from 'path';
import { parse as csvParse, ParseResult } from 'papaparse';
import * as XLSX from 'xlsx';
import fs from 'fs';
import { Request } from 'express';
import { FileData } from '../types/FileTypes';

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (_req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
): void => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext === '.csv' || ext === '.xlsx') {
        cb(null, true);
    } else {
        cb(new Error('Only CSV and XLSX files are allowed'));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 25 * 1024 * 1024 }
});

export const parseFile = async (filePath: string): Promise<FileData[]> => {
    const ext = path.extname(filePath).toLowerCase();

    if (ext === '.csv') {
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        return new Promise((resolve, reject) => {
            csvParse<FileData>(fileContent, {
                delimiter: ';',
                header: true,
                complete: (results: ParseResult<FileData>) => resolve(results.data),
                error: (error: Error) => reject(error)
            });
        });
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    return XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) as FileData[];
};