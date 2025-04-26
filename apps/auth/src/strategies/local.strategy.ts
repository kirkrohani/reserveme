import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStategy extends PassportStrategy(Strategy) {
  protected readonly logger: Logger = new Logger(LocalStategy.name);

  constructor(private readonly usersService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    this.logger.log(
      `\n------------------------------------------> Local Strategy validate() returns user obj from UserService.verifyUser() )} <------------------------------------------\n `,
    );
    try {
      return await this.usersService.verifyUser(email, password);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
