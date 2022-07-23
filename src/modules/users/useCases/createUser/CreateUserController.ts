import { Context } from "koa";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(context: Context): Promise<void> {
    const { displayName, email, password, photoUrl, birthDate } = context.request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    await createUserUseCase.execute({
      displayName,
      email,
      password,
      photoUrl,
      birthDate,
    });
    context.response.status = 201;
    context.response.body = {
      message: "Usuário salvo.",
    }
  }
}