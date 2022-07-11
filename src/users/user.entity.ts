import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryColumn('uuid', { generated: true, nullable: false })
  readonly id!: string;

  @Column('varchar')
  readonly email: string;

  @Column('varchar')
  readonly email_constraint: string;

  @Column('boolean')
  readonly email_verified: boolean;

  @Column('boolean')
  readonly enabled: boolean;

  @Column('varchar')
  readonly first_name: string;

  @Column('varchar')
  readonly last_name: string;

  @Column('varchar')
  readonly realm_id: string;

  @Column('varchar')
  readonly username: string;

  @Column('int')
  readonly created_timestamp: number;

  @Column('varchar')
  readonly service_account_client_link: string;

  @Column('int')
  readonly not_before: number;
}
