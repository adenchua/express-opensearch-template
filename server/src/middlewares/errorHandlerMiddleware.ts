import { Request, Response, NextFunction } from "express";

// custom error handling middleware for async errors.
const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // although 4 args needs to be specified for error middlewares, next function is not used here
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): void => {
  console.error(error.stack || error.message); // stack is only present in development
  res.sendStatus(500);
};

export default { errorHandler };
