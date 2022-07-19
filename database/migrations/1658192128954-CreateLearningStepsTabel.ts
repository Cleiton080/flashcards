import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateLearningStepsTabel1658192128954
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'learning_steps',
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
      'learning_steps',
      new TableColumn({
        name: 'card_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'learning_steps',
      new TableForeignKey({
        columnNames: ['card_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cards',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const learningStepsTable = await queryRunner.getTable('learning_steps');
    const foreignKey = learningStepsTable.foreignKeys.find((foreignKey) =>
      foreignKey.columnNames.includes('card_id'),
    );

    await queryRunner.dropForeignKey('learning_steps', foreignKey);
    await queryRunner.dropColumn('learning_steps', 'card_id');
    await queryRunner.dropTable('learning_steps');
  }
}
