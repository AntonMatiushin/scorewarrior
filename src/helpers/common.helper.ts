import { Request, Response, NextFunction, RequestHandler } from 'express';
import { BadRequestError, BaseError } from '@src/errors/errors.definitions';
import Joi from 'joi';
import { ILogger } from '@src/types/common';
import { keys } from 'lodash';

export function makeController(handler): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}

export const createErrorHandlerMiddleware =
  (logger: ILogger) =>
  (err: Error, req: Request, res: Response, next: NextFunction): Response => {
    logger.error(`Error: ${err.message}`);
    return err instanceof BaseError
      ? res
          .status(err.code)
          .json({ error: { code: err.code, message: err.message } })
      : res
          .status(500)
          .json({ error: { code: 500, message: 'Internal error' } });
  };

export const createIncomingRequestMiddleware = (logger: ILogger) => {
  return (req: Request, res: Response, next: NextFunction) => {
    logger.info(
      `Incoming request: ${
        keys(req.query).length ? JSON.stringify(req.query) : ''
      }`,
    );
    next();
  };
};

export const createLogResponseMiddleware = (logger: ILogger) => {
  return (req: Request, res: Response, next: NextFunction) => {
    /**
     * TODO log response body
     */
    next();
  };
};

export const validateInput = (value: any, schema: Joi.AnySchema) => {
  try {
    Joi.assert(value, schema);
  } catch (err) {
    throw new BadRequestError(err.details[0].message);
  }
};
