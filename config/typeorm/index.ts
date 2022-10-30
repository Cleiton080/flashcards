import { DataSourceOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import Datasource from 'config/typeorm/datasource';

@Injectable()
export class TypeOrmService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<DataSourceOptions> {
    return Datasource.options;
  }
}
