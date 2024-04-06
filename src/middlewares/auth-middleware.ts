import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import config from '@/config';
import { AppError } from '@/errors';

export class AuthMiddleware {
  async auth(request: Request, response: Response, next: NextFunction) {
    const authorization = request.headers.authorization ?? '';
    const [, token] = authorization.split(' ');
    
    if (!token) {
      throw new AppError(401, 'Authorization key is missing');
    }

    try {
      const payload = verify(token, config.jwt.authKey);

      request.body.userId = Number(payload.sub); 

      next();
    } catch(error) {
      console.error(error);

      throw new AppError(401, 'Invalid authorization key');
    }
  }
}