export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = "HttpError";
  }
}

export const badRequest = (msg: string, code?: string) => new HttpError(400, msg, code);
export const unauthorized = (msg = "Not authenticated", code?: string) => new HttpError(401, msg, code);
export const forbidden = (msg = "Forbidden", code?: string) => new HttpError(403, msg, code);
export const notFound = (msg = "Not found") => new HttpError(404, msg);
export const conflict = (msg: string, code?: string) => new HttpError(409, msg, code);
