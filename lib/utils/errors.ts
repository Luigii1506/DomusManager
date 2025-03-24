export class DatabaseError extends Error {
  code: string;
  meta?: Record<string, any>;

  constructor(message: string, code: string, meta?: Record<string, any>) {
    super(message);
    Object.setPrototypeOf(this, DatabaseError.prototype);
    this.name = "DatabaseError";
    this.code = code;
    this.meta = meta;
  }
}

export function isErrorWithCode(error: unknown): error is { code: string } {
  return typeof error === "object" && error !== null && "code" in error;
}

export function isRetryableError(error: unknown): boolean {
  if (error instanceof DatabaseError || isErrorWithCode(error)) {
    const retryableCodes = ["P1001", "P1002", "P1008", "P1017"];
    return retryableCodes.includes(error.code);
  }
  return false;
}
