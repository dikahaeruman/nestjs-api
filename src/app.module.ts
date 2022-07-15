import { Logger, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UtilsModule } from './utils/utils.module';

@Module({
  imports: [PrismaModule, AuthModule, UtilsModule],
  providers: [Logger],
})
export class AppModule {}
