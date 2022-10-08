import { BaseEntity } from 'typeorm';
import ListEntity from '../entities/List.entity';
import TaskEntity from '../entities/Task.entity';
import TokenEntity from '../entities/Token.entity';
import UserEntity from '../entities/User.entity';

export default class ModelToEntityFactory {
  static makeEntity<T>(modelInstance: T): BaseEntity {
    const modelName: string = (<new () => T>modelInstance).constructor.name;

    const map: Record<string, BaseEntity> = {
      List: Object.assign<ListEntity, T>(new ListEntity(), modelInstance),
      Task: Object.assign<TaskEntity, T>(new TaskEntity(), modelInstance),
      Token: Object.assign<TokenEntity, T>(new TokenEntity(), modelInstance),
      User: Object.assign<UserEntity, T>(new UserEntity(), modelInstance),
    }
    return map[modelName]
  }
}
