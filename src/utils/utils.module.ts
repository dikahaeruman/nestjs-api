import { Module } from '@nestjs/common';
import { LoggerUtils } from './logger.utils.service';

@Module({
  providers: [LoggerUtils],
  exports: [LoggerUtils],
})
export class UtilsModule {}
