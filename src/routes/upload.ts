import { Router, Request, Response, RequestHandler } from 'express';
import { upload, parseFile } from '../services/FileUploadService';
import fs from 'fs';

const router = Router();

interface FileRequest extends Request {
    file?: Express.Multer.File;
}

const uploadHandler: RequestHandler = async (req: FileRequest, res: Response): Promise<void> => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No file uploaded' });
            return;
        }

        const parsedData = await parseFile(req.file.path);

        fs.unlinkSync(req.file.path);

        res.json({
            success: true,
            data: parsedData
        });
    } catch (error) {
        if (req.file) {
            fs.unlinkSync(req.file.path);
        }
        res.status(400).json({
            error: error instanceof Error ? error.message : 'Error processing file'
        });
    }
};

router.post('/upload', upload.single('file'), uploadHandler);

export default router;