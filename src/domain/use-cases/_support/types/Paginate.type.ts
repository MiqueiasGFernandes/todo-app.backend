import { OrderEnum } from '../enums/Order.enum';

export type Paginate = {
  page: number,
  limit: number,
  order: OrderEnum,
}
