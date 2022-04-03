import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddRelationshipLanguageDeck1648996877796
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'languages_decks',
      new TableForeignKey({
        columnNames: ['language_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'languages',
      }),
    );

    await queryRunner.createForeignKey(
      'languages_decks',
      new TableForeignKey({
        columnNames: ['deck_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'decks',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('languages_decks');
    const foreignKeys = table.foreignKeys.filter(
      (fk) =>
        fk.columnNames.includes('language_id') ||
        fk.columnNames.includes('deck_id'),
    );

    await queryRunner.dropForeignKeys('languages_decks', foreignKeys);
  }
}
