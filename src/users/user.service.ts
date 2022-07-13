import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async whoami(context: any): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({
      where: { id: context.req.user.sub },
    });
  }
}
