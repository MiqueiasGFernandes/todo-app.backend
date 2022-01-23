import { Task } from './Task.model';

export type List ={
  id: string
  name: string
  description: string
  icon: string
  tasks: Task[]
}
