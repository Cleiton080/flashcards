import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Unprotected } from 'nest-keycloak-connect';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Resolver('Auth')
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Unprotected()
  @Mutation()
  async login(@Args('input') loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }
}
