import { CustomError } from '@/errors/customError.js';

export class Unauthenticated extends CustomError<ErrorCode> {}
