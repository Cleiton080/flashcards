import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationshipDeckCard1648003261354
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'cards',
      new TableForeignKey({
        columnNames: ['deck_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'decks',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('cards');
    const foreignKeys = table.foreignKeys.filter((fk) =>
      fk.columnNames.includes('deck_id'),
    );

    await queryRunner.dropForeignKeys('cards', foreignKeys);
  }
}
