import { CardEntity } from 'src/cards/card.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reviews')
export class ReviewEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar')
  delay_response: string;

  @ManyToOne(() => CardEntity, (card) => card.reviews)
  @JoinColumn({ name: 'card_id', referencedColumnName: 'id' })
  card: CardEntity;

  @Column('uuid')
  card_id: string;

  @Column('uuid')
  review_answer_id: string;

  @CreateDateColumn({ default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
