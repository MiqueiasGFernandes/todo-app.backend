import List from '@domain/models/List.model';

export interface IUpdateListUseCase {
  update(list: List): Promise<List>
}
