import { List } from '@domain/models/List.model';

export interface IGetListUseCase {
  get(id: string): Promise<List>
}
