import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';

import { AppError } from '@/errors';
import { MongoDB, sessionRoutes, userRoutes } from '@/infra';

const server = express();
const port = 3200;
const uri = 'mongodb://mongo:27017/';

MongoDB.connect(uri).then(() => {
  console.log('connected with database!');

  server.use(express.json());

  server.get('/status', (req, res) => {
    return res.send({ ok: true });
  });

  server.use('/session', sessionRoutes);
  server.use('/user', userRoutes);

  server.listen(port, '0.0.0.0', () => {
    console.log(`API up and running on port ${port}`);
  });

  server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return res
      .status(err.statusCode)
      .json({ message: err.message });
    }

    console.error(err);

    res
    .status(500)
    .json({ message: 'An internal server error has occoured' });
    
    next(err);
  });
});
