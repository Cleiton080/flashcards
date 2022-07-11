// environment
const NODE_ENV: string = process.env.NODE_ENV || 'development';

// typeorm
const enviroment = {
  development: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
};
const TYPEORM = enviroment[NODE_ENV];

// keycloak
const KEYCLOAK = {
  authServer: process.env.KEYCLOAK_AUTH_SERVER,
  realm: process.env.KEYCLOAK_REALM,
  clientId: process.env.KEYCLOAK_CLIENT_ID,
  secret: process.env.KEYCLOAK_SECRET,
};

const KEYCLOAKDB = {
  host: process.env.KEYCLOAK_DATABASE_HOST,
  port: parseInt(process.env.KEYCLOAK_DATABASE_PORT),
  username: process.env.KEYCLOAK_DATABASE_USER,
  password: process.env.KEYCLOAK_DATABASE_PASSWORD,
  database: process.env.KEYCLOAK_DATABASE_NAME,
};

export { NODE_ENV, TYPEORM, KEYCLOAK, KEYCLOAKDB };
