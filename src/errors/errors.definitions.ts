export class BaseError extends Error {
  constructor(
    protected httpCode: number,
    public message: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  public get code(): number {
    return this.httpCode;
  }
}

export class BadRequestError extends BaseError {
  constructor(details = 'Bad Request') {
    super(400, details);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class NotAuthorizedError extends BaseError {
  constructor(details = 'Not Authorized') {
    super(401, details);
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}

export class ForbiddenError extends BaseError {
  constructor(details = 'Forbidden') {
    super(403, details);
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

export class NotFoundError extends BaseError {
  constructor(details = 'Not found') {
    super(404, details);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class InternalServerError extends BaseError {
  constructor(details = 'Internal Server Error') {
    super(500, details);
    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}
