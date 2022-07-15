import { ForbiddenException, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private readonly logger: Logger) {}

  async signup(dto: AuthDto) {
    const hashedPassword = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
          name: dto.name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      this.logger.log(
        'Registration for ' + dto.email + ' succeed.',
        'AuthService',
      );
      return user;
    } catch (error) {
      this.logger.log(
        'Registration for ' + dto.email + ' failed.',
        'AuthService',
      );
      this.logger.error(error, 'AuthService');
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials are taken.');
        }
      }
      throw error;
    }
  }
}
