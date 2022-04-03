import { DeckEntity } from 'src/decks/deck.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  @Column('float')
  ease: number;

  @Column('timestamp')
  due: Date;

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
