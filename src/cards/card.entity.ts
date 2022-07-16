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

@Entity('cards')
export class CardEntity extends BaseEntity {
  @Column('uuid', { primary: true })
  id: string;

  @Column('varchar')
  front: string;

  @Column('varchar')
  back: string;

  @Column('number')
  current_interval: number;

  @Column('float')
  ease: number;

  @Column('timestamp')
  due: Date;

  @OneToMany(() => ReviewEntity, (review) => review.card)
  reviews: ReviewEntity[];

  @ManyToOne(() => DeckEntity, (deck) => deck.cards)
  @JoinColumn({ name: 'deck_id', referencedColumnName: 'id' })
  deck!: DeckEntity;

  @Column('uuid')
  deck_id!: string;

  @CreateDateColumn({ default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
