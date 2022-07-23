import { Context } from "koa";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(context: Context): Promise<any> {
    const { displayName, email, password, photoUrl } = context.request.body;
    const createUserUseCase = container.resolve(CreateUserUseCase);
    await createUserUseCase.execute({
      displayName,
      email,
      password,
      photoUrl,
    });
    context.response.status = 201;
    context.response.body = {'message': 'Usuário salvo.'}
  }
}