import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateReLearningStepsTabel1658192595913
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 're_learning_steps',
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
            name: 'interval_time',
            type: 'interval',
          },
          {
            name: 'ordering',
            type: 'int',
            isGenerated: true,
            generationStrategy: 'increment',
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
      're_learning_steps',
      new TableColumn({
        name: 'card_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      're_learning_steps',
      new TableForeignKey({
        columnNames: ['card_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cards',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const reLearningStepsTable = await queryRunner.getTable(
      're_learning_steps',
    );
    const foreignKey = reLearningStepsTable.foreignKeys.find((foreignKey) =>
      foreignKey.columnNames.includes('card_id'),
    );

    await queryRunner.dropForeignKey('re_learning_steps', foreignKey);
    await queryRunner.dropColumn('re_learning_steps', 'card_id');
    await queryRunner.dropTable('re_learning_steps');
  }
}
