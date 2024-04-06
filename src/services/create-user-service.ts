import { hash } from 'bcrypt';

import { UserRepository } from '@/infra';
import { AppError } from '@/errors';

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: CreateUserService.Request
  ): Promise<CreateUserService.Response> {
    const required = ['name', 'email', 'password', 'passwordConfirmation'];
    
    for (const mandatoryField of required) {
      
      if (!request[mandatoryField]) {
        throw new AppError(400, `Field ${mandatoryField} is missing`);
      }
    }
    
    const { email, name, password, passwordConfirmation } = request;
    const emailAlreadyInUse = 
      await this.userRepository.getByEmail(email);
    
    if (emailAlreadyInUse) {
      throw new AppError(400, 'Email already in use');
    }

    if (password !== passwordConfirmation) {
      throw new AppError(400, 'Passwords does not match');
    }

    const hashedPassword = await hash(password, 8);
    const createdUser = await this.userRepository.create(name, email, hashedPassword);
    
    return {
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      created_at: createdUser.created_at,
      updated_at: createdUser.updated_at
    };
  }   
}

export namespace CreateUserService {
  export type Request = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };

  export type Response = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}