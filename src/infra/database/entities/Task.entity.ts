import {
  BaseEntity,
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import List from './List.entity';

@Entity('tasks')
export default class Task extends BaseEntity {
  @PrimaryColumn('varchar')
    id: string;

  @Column('varchar', { nullable: true })
    description: string;

  @Column('boolean', { default: false })
    done: boolean;

  @Column('varchar')
    listId: number;

  @JoinColumn({ name: 'listId' })
  @ManyToOne(() => List, (list) => list.tasks)
    list?: Promise<List>;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn({ nullable: true })
    updatedAt?: Date;
}
