import { HttpModuleOptions, HttpModuleOptionsFactory } from '@nestjs/axios';
import { KEYCLOAK } from 'src/common/constants/global';

export class AuthApiService implements HttpModuleOptionsFactory {
  async createHttpOptions(): Promise<HttpModuleOptions> {
    return {
      baseURL: KEYCLOAK.authServer,
      timeout: 5000,
    };
  }
}
