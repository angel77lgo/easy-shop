import { HttpException, Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { User } from '../model/user.entity';
import { Sequelize, Transaction } from 'sequelize';
import { InjectConnection } from '@nestjs/sequelize';
const bcrypt = require('bcrypt');

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepository) private readonly userRepository: UserRepository,
    @InjectConnection() private readonly sequelize: Sequelize,
  ) {}

  async createUser(data: Partial<User>, ts?: Transaction) {
    const { firstName, lastName, email, password, organizationId, roleId } =
      data;

    const transaction = !ts ? await this.sequelize.transaction() : ts;

    try {
      const hashedPassword = this.hashPassword(password);

      const newUser = await this.userRepository.create(
        {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          organizationId,
          roleId,
        },
        transaction,
      );
      if (!ts) await transaction.commit();
      return newUser;
    } catch (error) {
      if (!ts) await transaction.rollback();
      throw new HttpException(error.message, 400);
    }
  }

  private hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}
