import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An internal server error occurred',
    error: err.message,
  });
};

export default errorMiddleware;