import { Context, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  async whoami(@Context() context: any): Promise<UserEntity> {
    return this.userService.whoami(context);
  }
}
