export class AppError extends Error {
  message: string;
  statusCode: number;
  
  constructor(statusCode: number, message: string) {
    super();

    Object.assign(this, { statusCode, message });
  }
}