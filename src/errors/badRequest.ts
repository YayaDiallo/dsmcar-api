import { CustomError } from './customError.js';

export class BadRequest extends CustomError<ErrorCode> {}
