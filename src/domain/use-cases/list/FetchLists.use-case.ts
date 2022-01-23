import { List } from '@domain/models/List.model';
import { FetchParams } from '@domain/use-cases/_support/types/FetchParams.type';

export interface IFetchListsUseCase {
  fetchLists(fetchParams?: FetchParams): Promise<List[]>
}
