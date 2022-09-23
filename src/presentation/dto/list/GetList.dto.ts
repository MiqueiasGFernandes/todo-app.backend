import GetTaskDto from '../task/GetTask.dto';

export default class CreateLisDto {
  id: string;

  name: string;

  description?: string | null;

  icon?: string | null;

  tasks: GetTaskDto[];
}
