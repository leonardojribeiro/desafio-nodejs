import { Context } from "koa";
import { container } from "tsyringe";
import { DeleteUserByIdUseCase } from "./DeleteUserByIdUseCase";

export class DeleteUserByIdController {
  async handle(context: Context): Promise<void> {
    const id = context.params.id;
    const deleteUserByIdUseCase = container.resolve(DeleteUserByIdUseCase);
    await deleteUserByIdUseCase.execute(id);
    context.response.status = 204;
  }
}