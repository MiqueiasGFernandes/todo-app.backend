import List from './List.model';

export default class User {
  id: string | null;

  name: string;

  password: string;

  email: string;

  active: boolean;

  lists?: List[];
}
