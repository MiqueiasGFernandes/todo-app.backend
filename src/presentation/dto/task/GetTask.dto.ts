import GetListDto from '../list/GetList.dto';

export default class GetTaskDto {
  id: string;

  description: string;

  done: boolean;

  listId: string;

  list?: GetListDto | null;
}
