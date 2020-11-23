export enum HttpStatusCode {
  Ok = 200,
  Created = 201,
  NoContent = 204,
}

export enum HttpStatusErrorCode {
  NotFound = 404,
  Unauthorized = 401,
  BadRequest = 400,
  InternalServerError = 500,
  ServiceUnavailable = 503,
}

export enum CommonPath {
  Health = '/health',
  Ping = '/ping',
}
