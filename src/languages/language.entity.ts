import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity('languages')
export class LanguageEntity extends BaseEntity {
  @Column('uuid', { primary: true })
  id: string;

  @Column('varchar')
  name: string;

  @CreateDateColumn({ default: 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
