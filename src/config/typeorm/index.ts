import { DataSourceOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import Ormconfig from 'src/config/typeorm/ormconfig';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<DataSourceOptions> {
    return Ormconfig.options;
  }
}
