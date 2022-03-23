import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationshipUserCardReview1648003532274
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'reviews',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
      }),
    );

    await queryRunner.createForeignKey(
      'reviews',
      new TableForeignKey({
        columnNames: ['card_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cards',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('reviews');
    const foreignKeys = table.foreignKeys.filter(
      (fk) =>
        fk.columnNames.includes('user_id') ||
        fk.columnNames.includes('card_id'),
    );

    await queryRunner.dropForeignKeys('reviews', foreignKeys);
  }
}
