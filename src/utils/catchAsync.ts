import { Request, Response, NextFunction } from 'express';

export default function catchAsync(
  callback: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await callback(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}
