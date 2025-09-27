import { Module } from '@nestjs/common';
import { ExceptionModule } from './exception/exception.module';

@Module({
  imports: [ExceptionModule]
})
export class CoreModule {}
