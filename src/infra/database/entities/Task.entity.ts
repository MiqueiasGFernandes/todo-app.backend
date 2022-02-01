import {
  Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import List from './List.entity';

export default class Task {
  @PrimaryColumn()
    id: string;

  @Column()
    description: string;

  @Column()
    done: boolean;

  @Column()
    list: List;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt?: Date;
}
