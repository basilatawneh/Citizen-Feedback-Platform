export enum EUsersTypes {
  ADMIN=1,
  PUBLIC_OFFICIAL=2,
  SOCIAL_WORKER=3
}
export interface IUserInfo {
  access_token: string;
  username: string;
  password?: string;
  role: EUsersTypes;
  id: string;
  full_name: string;

}
export interface IUser {
  info: IUserInfo;
}
