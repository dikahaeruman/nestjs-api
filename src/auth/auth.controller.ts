import { Body, Controller, Ip, Logger, Post } from '@nestjs/common';
import { LoggerUtils } from 'src/utils/logger.utils.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly logger: Logger,
    private loggerUtils: LoggerUtils,
  ) {}

  @Post('signup')
  signup(@Body() dto: AuthDto, @Ip() clientIP: string) {
    this.logger.log(
      this.loggerUtils.logController('POST /auth/signup', dto.email, clientIP),
      AuthController.name,
    );

    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: AuthDto, @Ip() clientIP: string) {
    this.logger.log(
      this.loggerUtils.logController('POST /auth/signin', dto.email, clientIP),
      AuthController.name,
    );

    return this.authService.signin(dto);
  }
}
