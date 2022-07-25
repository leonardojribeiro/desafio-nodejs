import { Middleware } from "koa";

import ratelimit from 'koa-ratelimit';

const db = new Map();

export function rateLimiter(): Middleware {
  return ratelimit({
    driver: 'memory',
    db: db,
    duration: 5000,
    errorMessage: 'Você atingiu o limite de requisições em um determinado período.',
    id: (ctx) => ctx.ip,
    headers: {
      remaining: 'Rate-Limit-Remaining',
      reset: 'Rate-Limit-Reset',
      total: 'Rate-Limit-Total'
    },
    max: 10,
    disableHeader: false,
  });
}