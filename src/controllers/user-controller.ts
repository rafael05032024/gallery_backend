import { Request, Response } from 'express';

import { CreateUserService } from '@/services';
import { UserRepository } from '@/infra';

export class UserContoller {
  async create(request: Request, response: Response) {
    const { name, email, password, passwordConfirmation } = request.body;
    const userRepository = new UserRepository();
    const createUserService = 
      new CreateUserService(userRepository);
    const newUser = 
      await createUserService.execute({ name, email, password, passwordConfirmation });

    response.status(201).json(newUser);    
  }
}