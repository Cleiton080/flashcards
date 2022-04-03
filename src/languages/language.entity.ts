import { DeckEntity } from 'src/decks/deck.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  UpdateDateColumn,
} from 'typeorm';

@Entity('languages')
export class LanguageEntity extends BaseEntity {
  @Column('uuid', { primary: true })
  id: string;

  @Column('varchar')
  name: string;

  @CreateDateColumn({ default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => DeckEntity, (deck) => deck.languages)
  @JoinTable({
    name: 'languages_decks',
    joinColumn: {
      name: 'language_id',
    },
    inverseJoinColumn: {
      name: 'deck_id',
    },
  })
  decks: DeckEntity[];
}
