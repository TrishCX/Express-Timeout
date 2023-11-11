import { NextFunction, Request, Response } from "express";

export type Options<T> = {
  content: T;
  timeout?: number;
  statusCode?: number;
  req: Request;
  res: Response;
  next: NextFunction;
  onTimeout?: () => any;
};

export type ExtendedOptions<T> = Options<T> & {
  /**
   * The default time is 30 seconds
   * @type {number}
   */
  maxRequests?: number;
};
