import {
  Column, CreateDateColumn, PrimaryColumn, UpdateDateColumn,
} from 'typeorm';

export default class Token {
  @PrimaryColumn()
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
