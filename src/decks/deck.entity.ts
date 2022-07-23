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

import { LearningStepEntity } from 'src/decks/learning-steps/learning-step.entity';
import { ReLearningStepEntity } from 'src/decks/re-learning-steps/re-learning-step.entity';

@Entity('decks')
export class DeckEntity extends BaseEntity {
  @PrimaryColumn('uuid', { generated: true, nullable: false })
  id!: string;

  @Column('varchar')
  name!: string;

  @Column('int')
  graduating_interval: number;

  @Column('int')
  easy_interval: number;

  @Column('float')
  interval_modifier: number;

  @Column('float')
  easy_bonus: number;

  @Column('varchar')
  user_id: string;

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

  @OneToMany(() => LearningStepEntity, (learningSteps) => learningSteps.deck, {
    eager: true,
    cascade: ['insert'],
  })
  learning_steps: LearningStepEntity[];

  @OneToMany(
    () => ReLearningStepEntity,
    (reLearningSteps) => reLearningSteps.deck,
    {
      eager: true,
      cascade: ['insert'],
    },
  )
  re_learning_steps: ReLearningStepEntity[];

  @CreateDateColumn({ default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
