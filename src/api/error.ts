export class ResponseError<T = unknown> extends Error {
  json: T

  constructor(message: string, json: T) {
    super(message)
    this.json = json
    this.name = 'ResponseError'
  }
}
