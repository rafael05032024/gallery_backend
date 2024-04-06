import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { UserRepository } from '@/infra';
import { AppError } from '@/errors';

export class CreateSessionService {
  constructor(
    private userRepository: UserRepository
  ) {}

  async execute(
    request: CreateSessionService.Request
  ): Promise<CreateSessionService.Response> {
    const user = 
      await this.userRepository.getByEmail(request.email);
    
    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const isPasswordCorrect = 
      await compare(request.password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError(400, 'Wrong Password');
    }

    const token = sign({}, 'zv68ai', {
      subject: String(user.id),
      expiresIn: '1d'
    });

    delete user.password;

    return {
      user,
      token
    };
  }
}

export namespace CreateSessionService {
  export type Request = {
    email: string;
    password: string;
  };

  export type Response = {
    user: {
      id: number;
      name: string;
      email: string;
    };
    token: string;
  };
}
