import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import route from './routes';
import bodyParser from 'body-parser';

const app = express();
dotenv.config();
export const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'pretty',
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', route);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});