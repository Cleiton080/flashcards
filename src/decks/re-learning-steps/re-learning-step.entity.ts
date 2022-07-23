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
import { DeckEntity } from 'src/decks/deck.entity';

@Entity('re_learning_steps')
export class ReLearningStepEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('interval')
  interval_time: string;

  @Column('int')
  ordering: number;

  @ManyToOne(() => DeckEntity, (deck) => deck.re_learning_steps)
  @JoinColumn({ name: 'deck_id', referencedColumnName: 'id' })
  deck: DeckEntity;

  @Column('uuid')
  deck_id: string;

  @CreateDateColumn({ default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
