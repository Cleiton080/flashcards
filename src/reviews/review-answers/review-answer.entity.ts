import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity('review_answers')
export class ReviewAnswerEntity extends BaseEntity {
  @Column('uuid', { primary: true })
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
