import { Context } from "koa";
import { container } from "tsyringe";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(context: Context): Promise<void> {
    const { displayName, email, password, photoUrl, birthDate } = context.request.body;
    const id = context.params.id;
    const updateUserUseCase = container.resolve(UpdateUserUseCase);
    await updateUserUseCase.execute({
      id,
      displayName,
      email,
      password,
      photoUrl,
      birthDate,
    });
    context.response.status = 200;
    context.response.body = {
      message: "Usuário alterado.",
    }
  }
}