import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCardTable1645369549640 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'cards',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'front',
            type: 'varchar(200)',
          },
          {
            name: 'back',
            type: 'varchar(200)',
          },
          {
            name: 'ease',
            type: 'float',
            default: 2.5,
          },
          {
            name: 'current_interval',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'due',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deck_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cards');
  }
}
