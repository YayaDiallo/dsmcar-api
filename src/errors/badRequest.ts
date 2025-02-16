import { CustomError } from '@/errors/customError.js';

export class BadRequest extends CustomError<ErrorCode> {}
