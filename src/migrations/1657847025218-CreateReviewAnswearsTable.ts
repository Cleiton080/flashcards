import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CreateReviewAnswearsTable1657847025218
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'review_answears',
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
            type: 'varchar(15)',
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

    // foreign keys
    await queryRunner.addColumn(
      'reviews',
      new TableColumn({
        name: 'review_answear_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'reviews',
      new TableForeignKey({
        columnNames: ['review_answear_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'review_answears',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const reviewsTable = await queryRunner.getTable('reviews');
    const foreignKey = await reviewsTable.foreignKeys.find((foreignKey) =>
      foreignKey.columnNames.includes('review_answear_id'),
    );

    await queryRunner.dropForeignKey('reviews', foreignKey);
    await queryRunner.dropColumn('reviews', 'review_answear_id');
    await queryRunner.dropTable('review_answears');
  }
}
