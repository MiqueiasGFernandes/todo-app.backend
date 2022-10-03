import List from './List.model';

export default class User {
  id?: string | null;

  name: string;

  password: string;

  passwordConfirmation?: string | null

  email: string;

  active: boolean;

  lists?: List[];
}
