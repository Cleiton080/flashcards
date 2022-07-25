import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateCardStagesTable1658714194266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'card_stages',
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
            type: 'varchar(35)',
            isUnique: true,
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

    await queryRunner.addColumn(
      'cards',
      new TableColumn({
        name: 'card_stage_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'cards',
      new TableForeignKey({
        columnNames: ['card_stage_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'card_stages',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const cardsTable = await queryRunner.getTable('cards');
    const foreignKey = cardsTable.foreignKeys.find((foreignKey) =>
      foreignKey.columnNames.includes('card_stage_id'),
    );

    await queryRunner.dropForeignKey('cards', foreignKey);
    await queryRunner.dropColumn('cards', 'card_stage_id');
    await queryRunner.dropTable('card_stages');
  }
}
