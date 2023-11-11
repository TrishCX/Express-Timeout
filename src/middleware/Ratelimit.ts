import type { Options } from "../typings/index";

const userRequests: Record<string, number> = {};
export function RateLimitMiddleware<T>(options: Options<T>) {
  const { next, req, res, content, statusCode, timeout, onTimeout } = options;

  const userIp = req?.ip as string;
  if (
    userRequests[userIp] &&
    Date.now() - userRequests[userIp] < Number(timeout)
  ) {
    onTimeout!();
    return res.status(Number(statusCode)).send(content);
  }
  userRequests[userIp] = Date.now();
  next();
}
