import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDeckTable1648002222391 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: 'decks',
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
            name: 'name',
            type: 'varchar(45)',
          },
          {
            name: 'learning_step_again',
            type: 'int',
            default: 1,
          },
          {
            name: 'learning_step_good',
            type: 'int',
            default: 10,
          },
          {
            name: 'graduating_interval',
            type: 'int',
            default: 1,
          },
          {
            name: 'easy_interval',
            type: 'int',
            default: 4,
          },
          {
            name: 'interval_modifier',
            type: 'float',
            default: 1,
          },
          {
            name: 'easy_bonus',
            type: 'float',
            default: 2.5,
          },
          {
            name: 'language_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
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
    await queryRunner.dropTable('decks');
  }
}
