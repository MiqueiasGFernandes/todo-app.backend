import {
  BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import List from './List.entity';

@Entity()
export default class User extends BaseEntity {
  @PrimaryColumn()
    id: string | null;

  @Column()
    name: string;

  @Column()
    password: string;

  @Column()
    email: string;

  @Column()
    active: boolean;

  @JoinColumn()
    lists?: List[];

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt?: Date;
}
