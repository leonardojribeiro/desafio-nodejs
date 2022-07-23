export interface IUser{
  id: string;
  displayName: string;
  email: string;
  password: string;
  photoUrl: string;
  birthDate: Date;
}

export interface IPublicUser{
  id: string;
  displayName: string;
  email: string; 
  photoUrl: string;
  birthDate: Date;
}