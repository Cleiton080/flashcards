import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthApiService } from 'src/config/auth';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: AuthApiService,
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
