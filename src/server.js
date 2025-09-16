import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routers/auth.js';
import tasksRouter from './routers/tasks.js';
import diariesRouter from './routers/diaries.js';
import usersRouter from './routers/users.js';
import weeksRouter from './routers/weeks.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';
import { allowedOrigins } from './constants/index.js';

dotenv.config();

const PORT = Number(process.env.PORT) || 3000;

export function setupServer() {
  const app = express();
  app.use(
    cors({
      origin: allowedOrigins,
      credentials: true,
    }),
  );

  app.use(express.json());

  app.use('/api/api-docs', swaggerDocs());

  app.use(cookieParser());

  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/tasks', tasksRouter);
  app.use('/api/diaries', diariesRouter);
  app.use('/api/weeks', weeksRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
