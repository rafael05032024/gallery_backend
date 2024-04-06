import { hash } from 'bcrypt';

import { UserRepository } from '@/repositories';
import { AppError } from '@/errors';

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  async execute(
    request: CreateUserService.Request
  ): Promise<CreateUserService.Response> {
    const { email, name, password } = request;
    const emailAlreadyInUse = 
      await this.userRepository.getByEmail(email);
    
    if (emailAlreadyInUse) {
      throw new AppError(400, 'Email already in use');
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
  };

  export type Response = {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
}