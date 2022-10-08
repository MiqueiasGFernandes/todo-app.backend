import {
  BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import Task from './Task.entity';

@Entity()
export default class List extends BaseEntity {
  @PrimaryColumn()
    id: string;

  @Column()
    name: string;

  @Column()
    description: string;

  @Column()
    icon: string;

  @JoinColumn()
    tasks: Task[];

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt?: Date;
}
