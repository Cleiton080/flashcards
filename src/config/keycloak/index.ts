import {
  KeycloakConnectOptionsFactory,
  KeycloakConnectOptions,
} from 'nest-keycloak-connect';
import { KEYCLOAK } from 'src/common/constants/global';

export class KeycloakService implements KeycloakConnectOptionsFactory {
  async createKeycloakConnectOptions(): Promise<KeycloakConnectOptions> {
    return {
      authServerUrl: KEYCLOAK.authServer,
      realm: KEYCLOAK.realm,
      clientId: KEYCLOAK.clientId,
      secret: KEYCLOAK.secret,
    };
  }
}
