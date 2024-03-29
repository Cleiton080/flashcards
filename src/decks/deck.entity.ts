import { CardEntity } from 'src/cards/card.entity';
import { LanguageEntity } from 'src/languages/language.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('decks')
export class DeckEntity extends BaseEntity {
  @PrimaryColumn('uuid', { generated: true, nullable: false })
  id!: string;

  @Column('varchar')
  name!: string;

  @Column('int')
  learning_step_again: number;

  @Column('int')
  learning_step_good: number;

  @Column('int')
  graduating_interval: number;

  @Column('int')
  easy_interval: number;

  @Column('float')
  interval_modifier: number;

  @Column('float')
  easy_bonus: number;

  @ManyToMany(() => LanguageEntity, (language) => language.decks, {
    eager: true,
    cascade: ['insert'],
  })
  @JoinTable({
    name: 'languages_decks',
    joinColumn: {
      name: 'deck_id',
    },
    inverseJoinColumn: {
      name: 'language_id',
    },
  })
  languages!: LanguageEntity[];

  @OneToMany(() => CardEntity, (card) => card.deck, {
    eager: true,
  })
  cards!: CardEntity[];

  @CreateDateColumn({ default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
