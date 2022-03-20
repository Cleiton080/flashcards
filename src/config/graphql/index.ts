import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';
import { join } from 'path';

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      typePaths: [join(__dirname, '..', '..', '**', 'schemas', '*.graphql')],
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
