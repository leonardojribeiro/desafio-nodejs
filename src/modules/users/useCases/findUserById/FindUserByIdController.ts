import { Context } from "koa";
import { container } from "tsyringe";
import { FindUserByIdUseCase } from "./FindUserByIdUseCase";

export class FindUserByIdController {
  async handle(context: Context): Promise<void> {
    const id = context.params.id;
    const findUserByIdUseCase = container.resolve(FindUserByIdUseCase);
    const user = await findUserByIdUseCase.execute(id);
    context.response.status = 200;
    context.response.body = user;
  }
}