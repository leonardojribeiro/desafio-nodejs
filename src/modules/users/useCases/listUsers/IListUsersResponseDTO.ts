import { IPublicUser } from "../../entities/IUser";

export interface IListUsersResponseDTO {
  users: IPublicUser[],
  usersCount: number,
}