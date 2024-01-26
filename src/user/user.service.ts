import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { LoggerService } from '../commons/logger/logger.service';
import { Repository } from 'typeorm';
import { RequestUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: LoggerService,
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async create(userCreateDto: RequestUserDto) {
    this.logger.debug(`Creating a new user: ${userCreateDto.email}`);

    const newUser = new User({ ...userCreateDto });

    try {
      await this.repository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        this.logger.warn(
          `User already exists in the database: ${userCreateDto.email}`,
        );

        throw new ConflictException(
          `User with email ${newUser.email} already exists`,
        );
      }

      this.logger.error(
        `Error creating user with email ${userCreateDto.email}: ${error.message}`,
      );
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async getByEmail(email: string) {
    return await this.repository.findBy({ email });
  }
}
