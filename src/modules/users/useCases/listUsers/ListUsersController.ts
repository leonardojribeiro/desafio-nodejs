import { ParameterizedContext } from "koa";
import { container } from "tsyringe";
import { IPaginatedState } from "../../../../types/IPaginatedState";
import { ListUsersUseCase } from "./ListUsersUseCase";

export class ListUsersController {
  async handle(context: ParameterizedContext<IPaginatedState>): Promise<void> {
    const displayName = context.request.query.displayName as string | undefined;
    const email = context.request.query.email as string | undefined;
    const { limit, skip } = context.state;
    const listUsersUseCase = container.resolve(ListUsersUseCase);
    const usersResponse = await listUsersUseCase.execute({
      displayName,
      email,
      limit,
      skip,
    });

    context.response.status = 200;
    context.response.body = usersResponse;
  }
}