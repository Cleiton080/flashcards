import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthApiService } from 'config/auth';
import { AuthResolver } from 'src/auth/auth.resolver';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useClass: AuthApiService,
    }),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
