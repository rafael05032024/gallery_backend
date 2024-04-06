import { Request, Response } from 'express';

import { CreateSessionService } from '@/services';
import { UserRepository } from '@/repositories';

export class SessionContoller {
  async create(request: Request, response: Response) {
    const { email, password } = request.body;
    const userRepository = new UserRepository();
    const createSessionService = 
      new CreateSessionService(userRepository);
    const credentials = 
      await createSessionService.execute({ email, password });

    response.status(200).json(credentials);    
  }
}