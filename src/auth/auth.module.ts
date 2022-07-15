import { Logger, Module } from '@nestjs/common';
import { UtilsModule } from 'src/utils/utils.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, Logger],
  controllers: [AuthController],
  imports: [UtilsModule],
})
export class AuthModule {}
