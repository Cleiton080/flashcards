import { Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { Unprotected } from 'nest-keycloak-connect';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  @Unprotected()
  async whoami(): Promise<UserEntity> {
    return this.userService.whoami();
  }
}
