import {
  BaseEntity,
  Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';
import List from './List.entity';

@Entity()
export default class Task extends BaseEntity {
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
