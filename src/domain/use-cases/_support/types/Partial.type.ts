export type PartialType<T> = {
  [K in keyof T]?: string | boolean | Date | number | unknown;
}
