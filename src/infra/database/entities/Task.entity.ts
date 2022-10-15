import {
  BaseEntity,
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import List from './List.entity';

@Entity()
export default class Task extends BaseEntity {
  @PrimaryColumn('varchar')
    id: string;

  @Column('varchar')
    description: string;

  @Column('boolean')
    done: boolean;

  @Column('varchar')
    listId: number;

  @JoinColumn({ name: 'listId' })
  @ManyToOne(() => List, (list) => list.tasks)
    list?: Promise<List>;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt?: Date;
}
