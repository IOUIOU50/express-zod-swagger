export class CommonError extends Error {
  constructor(
    public message: string,
    public status: number,
    public detail?: unknown
  ) {
    super(message);
  }
}

export class BadRequestError extends CommonError {
  constructor(message: string, status: number, detail?: unknown) {
    super(message, status, detail);
  }
}
