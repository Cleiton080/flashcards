import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('decks')
export class DeckEntity extends BaseEntity {
  @PrimaryColumn('uuid', { generated: true, nullable: false })
  id: string;

  @Column('varchar')
  name: string;

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

  @Column('varchar')
  language_id: string;

  @CreateDateColumn({ default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
