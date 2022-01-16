import { Injectable } from '@nestjs/common'
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql'

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
	async createGqlOptions(): Promise<GqlModuleOptions> {
		return {
			typePaths: ['./**/*.graphql'],
			cors: true,
			bodyParserConfig: { limit: '50mb' },
			introspection: true,
			installSubscriptionHandlers: true,
		}
	}
}