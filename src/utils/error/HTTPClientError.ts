import { HttpStatusErrorCode, ErrorCode } from '../../commons/constants';
export abstract class HTTPClientError extends Error {
  readonly statusCode!: HttpStatusErrorCode;
  readonly name!: string;
  readonly code!: ErrorCode;

  constructor(message: object | string, code: ErrorCode) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}
