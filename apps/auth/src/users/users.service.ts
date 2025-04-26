import {
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  protected readonly logger: Logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  /**
   * CREATE USER - creates a new user document in the db
   * @param createUserDto
   * @returns
   */
  async create(createUserDto: CreateUserDto) {
    await this.validateCreateUserDto(createUserDto);
    console.log('back in the create');
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  private async validateCreateUserDto(createUserDto: CreateUserDto) {
    console.log('EMAIL: ', createUserDto);
    try {
      await this.usersRepository.findOne({
        email: createUserDto.email,
      });
    } catch (err) {
      return;
    }
    throw new UnprocessableEntityException(
      `Duplicate User ${createUserDto.email}`,
    );
  }

  /**
   * VERIFY USER  - checks if user in db and if hashed password matches
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

      this.logger.log(
        `\n------------------------------------------> Users Service verifyUser() successful)} \n `,
      );
      return user;
    }
  }

  async getUser(getUserDto: GetUserDto) {
    const user = await this.usersRepository.findOne(getUserDto);
    if (!user) {
      throw new NotFoundException(
        `User ${JSON.stringify(getUserDto)} not found `,
      );
    }
    return user;
  }
}
