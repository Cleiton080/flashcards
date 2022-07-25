import { DeckEntity } from 'src/decks/deck.entity';
import { ReviewEntity } from 'src/reviews/review.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { CardStageEntity } from './card-stages/card-stage.entity';

@Entity('cards')
export class CardEntity extends BaseEntity {
  @Column('uuid', { primary: true })
  id: string;

  @Column('varchar')
  front: string;

  @Column('varchar')
  back: string;

  @Column('int')
  current_interval: number;

  @Column('float')
  ease: number;

  @Column('timestamp')
  due: Date;

  @OneToMany(() => ReviewEntity, (review) => review.card, {
    eager: true,
  })
  reviews: ReviewEntity[];

  @ManyToOne(() => DeckEntity, (deck) => deck.cards)
  @JoinColumn({ name: 'deck_id', referencedColumnName: 'id' })
  deck!: DeckEntity;

  @Column('uuid')
  deck_id!: string;

  @ManyToOne(() => CardStageEntity, (cardStage) => cardStage.cards)
  @JoinColumn({ name: 'card_stage_id', referencedColumnName: 'id' })
  card_stage: CardStageEntity;

  @Column('uuid')
  card_stage_id!: string;

  @CreateDateColumn({ default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
