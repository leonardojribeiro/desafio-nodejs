import { Context, Next } from "koa";
import { AppError } from "../errors/AppError";

export async function errorHandler(context: Context, next: Next) {
  try {
    await next();
  }
  catch (err) {
    if (err instanceof AppError) {
      context.response.status = err.statusCode;
      context.response.body = {
        "message": err.message
      };
    }
    else {
      context.response.status = 500;
      context.response.body = {
        "message": "Ocorreu um erro desconhecido."
      };
    }
  }
}