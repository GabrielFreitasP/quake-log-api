import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { ConfigurationService } from '../commons/config/configuration.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configurationService: ConfigurationService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const users = await this.usersService.getByEmail(email);
    if (users.length === 0) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const result = bcrypt.compareSync(password.toString(), users[0].password);
    if (users[0] && result) {
      return users[0];
    }

    if (!result) {
      throw new UnauthorizedException('Invalid password');
    } else if (!users[0]) {
      throw new UnauthorizedException('Unauthorized user');
    }
  }

  async login(userEntity: User) {
    const { email, roles } = userEntity;
    return {
      email,
      accessToken: this.jwtService.sign({ email, roles }),
      expiresIn: `${this.configurationService.authJwtExpiresIn}s`,
    };
  }
}
