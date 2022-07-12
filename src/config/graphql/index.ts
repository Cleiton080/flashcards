import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<ApolloDriverConfig> {
    return {
      typePaths: [join(__dirname, '..', '..', '**', '*.graphql')],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
      path: '/',
      cors: true,
      bodyParserConfig: { limit: '50mb' },
      introspection: true,
      installSubscriptionHandlers: true,
      playground: true,
    };
  }
}
