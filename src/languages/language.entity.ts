import { DeckEntity } from 'src/decks/deck.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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

  @OneToMany(() => DeckEntity, (deck) => deck.language, {
    eager: true,
  })
  decks: DeckEntity[];
}
