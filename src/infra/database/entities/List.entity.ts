import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import Task from './Task.entity';
import User from './User.entity';

@Entity()
export default class List extends BaseEntity {
  @PrimaryColumn('varchar')
    id: string;

  @Column('varchar')
    name: string;

  @Column('text')
    description: string;

  @Column('text')
    icon: string;

  @Column('varchar')
    userId: string

  @OneToMany(
    () => Task,
    (task) => task.list,
  )
    tasks: Promise<Task[]>;

  @ManyToOne(
    () => User,
    (user) => user.lists,
  )
    user: Promise<User>;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt?: Date;
}
