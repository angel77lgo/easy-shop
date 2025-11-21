import { Module } from '@nestjs/common';
import { ExceptionModule } from './exception/exception.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ExceptionModule, AuthModule],
})
export class CoreModule {}
