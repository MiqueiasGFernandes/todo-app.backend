import {
  BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import List from './List.entity';

@Entity('users')
export default class User extends BaseEntity {
  @PrimaryColumn('varchar')
    id: string | null;

  @Column('varchar')
    name: string;

  @Column('varchar')
    password: string;

  @Column('varchar')
    email: string;

  @Column('boolean')
    active: boolean;

  @OneToMany(() => List, (lists) => lists.user)
    lists?: List[];

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn({ nullable: true })
    updatedAt?: Date;
}
