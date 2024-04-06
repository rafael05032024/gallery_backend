import 'express-async-errors';

import express, { NextFunction, Request, Response } from 'express';
import fileupload from 'express-fileupload';

import config from './config';
import { AppError } from '@/errors';
import { MongoDB, routes } from '@/infra';

const server = express();
const uri = 'mongodb://mongo:27017/';

MongoDB.connect(uri).then(() => {
  console.log('connected with database!');

  server.use(express.json());
  server.use(fileupload());

  server.get('/status', (req, res) => {
    return res.send({ ok: true });
  });

  server.use('/session', routes.sessionRoutes);
  server.use('/user', routes.userRoutes);
  server.use('/gallery', routes.galleryRoutes);

  if (config.env === 'dev') {
    server.listen(Number(config.port), '0.0.0.0', () => {
      console.log(`API up and running on port ${Number(config.port)}`);
    });
  } else {
    server.listen(Number(config.port), () => {
      console.log(`API up and running on port ${Number(config.port)}`);
    });
  }
  
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
