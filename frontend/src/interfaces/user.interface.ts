export interface IUser {
  user_id: number;
  username: string;
  fullname: string;
  password: string;
  email: string;
  status: string;
  avatar?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: number;
  updated_by?: number;
}

export type IAuth = {
  isAuthenticated: boolean;
  userInfo: IUser;
  accessToken?: string;
  refreshToken?: string;
};
