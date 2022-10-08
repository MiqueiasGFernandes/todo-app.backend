import List from '@domain/models/List.model';

export interface IAddListUseCase {
  add(list: List): Promise<List>
}
