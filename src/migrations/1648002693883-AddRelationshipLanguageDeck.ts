import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationshipLanguageDeck1648002693883
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'decks',
      new TableForeignKey({
        columnNames: ['language_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'languages',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('decks');
    const foreignKeys = table.foreignKeys.filter((fk) =>
      fk.columnNames.includes('language_id'),
    );

    await queryRunner.dropForeignKeys('decks', foreignKeys);
  }
}
