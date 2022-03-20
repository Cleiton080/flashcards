import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCardTable1645369549640 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cards',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'type',
            type: 'varchar(100)',
            isNullable: true,
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
    await queryRunner.dropTable('cards');
  }
}
