import express, { Application } from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import errorMiddleware from './middleware/errorMiddleware';
import { generalLimiter } from './middleware/rateLimiter';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(generalLimiter);

app.use(express.json());


app.use('/auth', authRoutes);


app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running successfully on port ${PORT}`);
});