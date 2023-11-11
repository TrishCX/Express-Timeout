import type { ExtendedOptions, Options } from "../typings";

const userRequests: Record<
  string,
  { lastRequestTime: number; requestCount: number }
> = {};

export function TimeoutMiddleware<T>(options: ExtendedOptions<T>) {
  const {
    content,
    maxRequests,
    next,
    req,
    res,
    statusCode,
    timeout,
    onTimeout,
  } = options;
  const userIp = req.ip as string;
  const currentTime = Date.now();
  const user = userRequests[userIp] || { lastRequestTime: 0, requestCount: 0 };
  if (currentTime - user.lastRequestTime < Number(timeout)) {
    user.requestCount++;

    if (user.requestCount > Number(maxRequests)) {
      onTimeout!();
      Number(timeout) - (currentTime - user.lastRequestTime);
      return res.status(Number(statusCode)).send(content);
    }
  } else {
    user.requestCount = 1;
  }
  user.lastRequestTime = currentTime;

  userRequests[userIp] = user;

  next();
}
