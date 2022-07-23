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

@Entity('learning_steps')
export class LearningStepEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('interval')
  interval_time: string;

  @Column('int')
  ordering: number;

  @ManyToOne(() => DeckEntity, (deck) => deck.learning_steps)
  @JoinColumn({ name: 'deck_id', referencedColumnName: 'id' })
  deck: DeckEntity;

  @Column('uuid')
  deck_id: string;

  @CreateDateColumn({ default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
