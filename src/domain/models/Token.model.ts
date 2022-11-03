export default class Token {
  id?: string | null

  value: string

  expiration?: string | number | null

  subject?: string | null

  createdAt?: Date | string
}
