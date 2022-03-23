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

  @Column('varchar', { default: 'simple' })
  type?: string;

  @Column('varchar')
  front: string;

  @Column('varchar')
  back: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
