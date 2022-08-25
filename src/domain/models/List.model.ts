import Task from './Task.model';

export default class List {
  id: string;

  name: string;

  description?: string | null;

  icon: string;

  tasks: Task[];
}
