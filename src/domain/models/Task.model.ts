import List from './List.model';

export default class Task {
  id: string;

  description: string;

  done: boolean;

  list: List;
}
