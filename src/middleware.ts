import { imageQuerySchema } from './joiSchemas';
import { Request, Response, NextFunction } from 'express';
import ExpressError from './utils/ExpressError';

export const validateImageQuery = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = imageQuerySchema.validate(req.query);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};
