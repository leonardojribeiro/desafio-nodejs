export interface IListUsersRequestDTO {
  displayName: string | undefined;
  email: string | undefined;
  skip: number | undefined;
  limit: number | undefined;
}