import { Context, Next } from "koa";
import { AppError } from "../errors/AppError";

export async function errorHandler(context: Context, next: Next) {
  try {
    await next();
  }
  catch (err) {
    if (err instanceof AppError) {
      console.log(err)
      context.status = err.statusCode;
      context.body = { "message": err.message };
    }
  }
}