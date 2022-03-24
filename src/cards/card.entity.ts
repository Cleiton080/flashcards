import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
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

  @Column('uuid') // deck relationship
  deck_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
