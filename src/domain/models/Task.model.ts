import { List } from './List.model';

export type Task = {
  id: string
  description: string
  done: boolean;
  list: List
}
