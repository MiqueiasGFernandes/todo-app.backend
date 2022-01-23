import { List } from './List.model';

export type User = {
  id?: string
  name: string
  password: string
  email: string
  active: boolean
  lists?: List[]
}
