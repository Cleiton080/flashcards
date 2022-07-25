import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CardEntity } from '../card.entity';

@Entity('card_stages')
export class CardStageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar')
  name: string;

  @OneToMany(() => CardEntity, (card) => card.card_stage)
  cards: CardEntity[];

  @CreateDateColumn({ default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
