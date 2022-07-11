import { MigrationInterface, QueryRunner } from 'typeorm';
import { KEYCLOAKDB } from '../common/constants/global';

export class CreateUserTable1647829859299 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS postgres_fdw');
    await queryRunner.query(`
      CREATE SERVER IF NOT EXISTS keycloakdb
      FOREIGN DATA WRAPPER postgres_fdw
      OPTIONS (host '${KEYCLOAKDB.host}', dbname '${KEYCLOAKDB.database}', port '5432')`);
    await queryRunner.query(`
      CREATE USER MAPPING IF NOT EXISTS FOR PUBLIC SERVER keycloakdb 
      OPTIONS (user '${KEYCLOAKDB.username}', password '${KEYCLOAKDB.password}');
    `);
    await queryRunner.query(`
      CREATE FOREIGN TABLE IF NOT EXISTS users (
        id uuid not null,
        email varchar(255),
        email_constraint varchar(255),
        email_verified boolean not null,
        enabled boolean not null,
        federation_link varchar(255),
        first_name varchar(255),
        last_name varchar(255),
        realm_id varchar(255),
        username varchar(255),
        created_timestamp int8,
        service_account_client_link varchar(255),
        not_before int4 not null
      ) SERVER keycloakdb
      OPTIONS (table_name 'user_entity')
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP FOREIGN TABLE IF EXISTS users');
    await queryRunner.query(
      'DROP USER MAPPING IF EXISTS FOR PUBLIC SERVER keycloakdb',
    );
    await queryRunner.query('DROP SERVER IF EXISTS keycloakdb');
    await queryRunner.query('DROP EXTENSION IF EXISTS postgres_fdw');
  }
}
