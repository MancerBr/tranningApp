import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcryptjs';

import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userModel: Repository<User>,
  ) {}

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({
      where: { email },
    });
  }

  async register(user) {
    const { email, password } = user;

    const salt = await genSalt(10);
    const newUser = this.userModel.create({
      ...user,
      password: await hash(password, salt),
    });

    try {
      return this.userModel.save(newUser);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
