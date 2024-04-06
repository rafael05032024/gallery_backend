import { Request, Response } from 'express';

import { CreateUserService } from '@/services';
import { UserRepository } from '@/repositories';

export class UserContoller {
  async create(request: Request, response: Response) {
    const { name, email, password } = request.body;
    const userRepository = new UserRepository();
    const createUserService = 
      new CreateUserService(userRepository);
    const newUser = 
      await createUserService.execute({ name, email, password });

    response.status(200).json(newUser);    
  }
}