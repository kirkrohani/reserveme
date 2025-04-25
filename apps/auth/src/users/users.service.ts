import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * CREATE USER - creates a new user document in the db
   * @param createUserDto
   * @returns
   */
  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  /**
   * VERIFY USER  - checks is user in db and if hashed password matches
   * @param email
   * @param password
   * @returns
   */
  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    //set default to false
    let isPasswordValid = false;
    if (user) {
      isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        throw new UnauthorizedException('Credentials Not Valid');

      return user;
    }
  }

  async getUser(getUserDto: GetUserDto) {
    const user = await this.usersRepository.findOne({ getUserDto });
    if (!user) {
      throw new NotFoundException(
        `User ${JSON.stringify(getUserDto)} not found `,
      );
    }
    return user;
  }
}
