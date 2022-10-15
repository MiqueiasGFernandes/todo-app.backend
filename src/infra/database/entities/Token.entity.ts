import {
  BaseEntity,
  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class Token extends BaseEntity {
  @PrimaryColumn('varchar')
    id: string;

  @Column()
    value: string;

  @Column()
    expired: boolean;

  @Column()
    ttl: number;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt?: Date;
}
