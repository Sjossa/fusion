import express from 'express';
import cors from 'cors';
import { mkdirSync } from 'fs';
import uploadRouter from './routes/upload';

const app = express();
const port = process.env.PORT || 3001;


mkdirSync('uploads', { recursive: true });


app.use(cors());
app.use(express.json());
app.use('/api', uploadRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});