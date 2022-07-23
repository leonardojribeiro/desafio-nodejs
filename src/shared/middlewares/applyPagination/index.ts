import { Next, ParameterizedContext } from "koa";
import { IPaginatedState } from "../../../types/IPaginatedState";
import { ApplyPaginationError } from "./ApplyPaginationError";

export async function applyPagination(context: ParameterizedContext<IPaginatedState>, next: Next) {
  const rawPage = context.request.query.page;
  const rawLimit = context.request.query.limit;
  const page = Number(rawPage);
  const limit = Number(rawLimit);
  if (!isNaN(page) && !isNaN(limit)) {
    if (page < 1) {
      throw new ApplyPaginationError.InvalidPage();
    }
    if (limit < 1) {
      throw new ApplyPaginationError.InvalidLimit();
    }
    context.state = {
      limit: limit,
      skip: (page - 1) * limit,
    }
  }
  await next();
}