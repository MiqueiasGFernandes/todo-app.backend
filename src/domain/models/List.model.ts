import Task from './Task.model';

export default class List {
  id: string;

  name: string;

  description: string;

  icon: string;

  tasks: Task[];
}
