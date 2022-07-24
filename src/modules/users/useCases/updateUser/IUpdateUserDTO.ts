export interface IUpdateUserDTO {
  id: string;
  displayName?: string;
  email?: string;
  password?: string;
  photoUrl?: string;
  birthDate?: Date;
}