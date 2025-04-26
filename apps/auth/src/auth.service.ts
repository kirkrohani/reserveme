import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';
import { UsersDocument } from './users/models/users.schema';

@Injectable()
export class AuthService {
  protected readonly logger: Logger = new Logger(AuthService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * LOGIN USER -
   *   Set token payload, set expiration, set auth token in response cookie
   * @param user
   * @param response
   * @returns
   */
  async login(user: UsersDocument, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    this.logger.log(
      `\n------------------------------------------> Auth Service login() response token successfully set as http cookie)} <------------------------------------------\n `,
    );
    return token;
  }
}
