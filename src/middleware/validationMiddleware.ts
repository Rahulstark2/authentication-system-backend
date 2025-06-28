import { NextFunction, RequestHandler, Response } from 'express';
import { AnyZodObject, ZodError } from 'zod';

const validate = (schema: AnyZodObject): RequestHandler =>
  (req, res, next) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Input validation error',
          errors: error.errors,
        });
        return;
      }
      next(error);
    }
  };


export default validate;