import { Request, Response, NextFunction, json } from 'express';

import { AppError } from '@/errors';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware {
  async auth(request: Request, response: Response, next: NextFunction) {
    const authorization = request.headers.authorization ?? '';
    const [, token] = authorization.split(' ');
    
    if (!token) {
      throw new AppError(401, 'Authorization key is missing');
    }

    try {
      const payload = verify(token, 'zv68ai');

      request.body.userId = Number(payload.sub); 

      next();
    } catch(error) {
      console.error(error);

      throw new AppError(401, 'Invalid authorization key');
    }
  }
}